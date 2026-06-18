import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDrafts, createDraft, updateDraft, deleteDraft, applyDraftToSlot } from '../drafts.api';
import { transformDraftBeerDBToDraftBeer } from '../../types/beers.types';

// Mock Supabase client
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();
const mockUpsert = vi.fn();
const mockEq = vi.fn();
const mockOrder = vi.fn();
const mockSingle = vi.fn();

const mockFrom = vi.fn(() => ({
  select: mockSelect,
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete,
  upsert: mockUpsert,
}));

// Chaining mocks
mockSelect.mockReturnValue({ order: mockOrder });
mockOrder.mockResolvedValue({ data: [], error: null });

mockInsert.mockReturnValue({ select: vi.fn(() => ({ single: mockSingle })) });
mockUpdate.mockReturnValue({ eq: mockEq });
mockDelete.mockReturnValue({ eq: mockEq });
mockEq.mockReturnValue({ select: vi.fn(() => ({ single: mockSingle })), ...Promise.resolve({ error: null }) }); // For delete and update chains
mockUpsert.mockReturnValue({ select: vi.fn(() => ({ single: mockSingle })) });

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

describe('drafts.api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDrafts', () => {
    it('should fetch drafts and transform them including color', async () => {
      const mockData = [
        {
          id: 1,
          image: 'img.jpg',
          brewery: 'Brewery',
          name: 'Beer',
          style: 'Style',
          color: '#FFD700',
          location: 'Location',
          description: 'Desc',
          price_glass: 500,
          price_pint: 800,
          alcohol: 5,
          created_at: '2023-01-01',
        },
        {
          id: 2,
          image: 'img2.jpg',
          brewery: 'Brewery2',
          name: 'Beer2',
          style: 'Style2',
          color: null, // color can be null
          location: 'Location2',
          description: 'Desc2',
          price_glass: 600,
          price_pint: 900,
          alcohol: 6,
          created_at: '2023-01-02',
        },
      ];
      mockOrder.mockResolvedValue({ data: mockData, error: null });

      const result = await getDrafts();

      expect(mockFrom).toHaveBeenCalledWith('beer_drafts');
      expect(mockSelect).toHaveBeenCalledWith('*');
      expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });
      expect(result).toEqual(mockData.map(transformDraftBeerDBToDraftBeer));
      // Verify color is correctly transformed
      expect(result[0].color).toBe('#FFD700');
      expect(result[1].color).toBeNull();
    });

    it('should throw error on fetch failure', async () => {
      const error = new Error('Fetch failed');
      mockOrder.mockResolvedValue({ data: null, error });

      await expect(getDrafts()).rejects.toThrow('Fetch failed');
    });
  });

  describe('createDraft', () => {
    it('should create a draft', async () => {
      const newDraft = {
        image: 'img.jpg',
        brewery: 'Brewery',
        name: 'Beer',
        style: 'Style',
        color: '#FFD700',
        location: 'Location',
        description: 'Desc',
        price: { glass: 500, pint: 800 },
        alcohol: 5,
      };
      const mockResponse = { ...newDraft, id: 1, created_at: '2023-01-01', price_glass: 500, price_pint: 800 };
      
      // Fix mock structure for insert->select->single
      const mockSingleInsert = vi.fn().mockResolvedValue({ data: mockResponse, error: null });
      mockInsert.mockReturnValue({ select: vi.fn(() => ({ single: mockSingleInsert })) });

      const result = await createDraft(newDraft);

      expect(mockFrom).toHaveBeenCalledWith('beer_drafts');
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Beer',
        color: '#FFD700',
        price_glass: 500,
      }));
      expect(result).toEqual(transformDraftBeerDBToDraftBeer(mockResponse));
    });
  });

  describe('updateDraft', () => {
    it('should update a draft', async () => {
      const draftToUpdate = {
        id: 1,
        image: 'img.jpg',
        brewery: 'Brewery',
        name: 'Beer Updated',
        style: 'Style',
        color: '#CD853F',
        location: 'Location',
        description: 'Desc',
        price: { glass: 600, pint: 900 },
        alcohol: 6,
      };
      const mockResponse = { ...draftToUpdate, created_at: '2023-01-01', price_glass: 600, price_pint: 900 };

      // Fix mock structure for update->eq->select->single
      const mockSingleUpdate = vi.fn().mockResolvedValue({ data: mockResponse, error: null });
      const mockSelectUpdate = vi.fn(() => ({ single: mockSingleUpdate }));
      mockEq.mockReturnValue({ select: mockSelectUpdate });

      const result = await updateDraft(draftToUpdate);

      expect(mockFrom).toHaveBeenCalledWith('beer_drafts');
      expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Beer Updated',
        color: '#CD853F',
      }));
      expect(mockEq).toHaveBeenCalledWith('id', 1);
      expect(result).toEqual(transformDraftBeerDBToDraftBeer(mockResponse));
    });
  });

  describe('deleteDraft', () => {
    it('should delete a draft', async () => {
      // Fix mock structure for delete->eq
      mockEq.mockResolvedValue({ error: null });

      await deleteDraft(1);

      expect(mockFrom).toHaveBeenCalledWith('beer_drafts');
      expect(mockDelete).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith('id', 1);
    });
  });

  describe('applyDraftToSlot', () => {
    it('should apply draft to a slot (upsert beer)', async () => {
        const draft = {
          id: 1,
          image: 'img.jpg',
          brewery: 'Brewery',
          name: 'Beer',
          style: 'Style',
          color: '#FFD700',
          location: 'Location',
          description: 'Desc',
          price: { glass: 500, pint: 800 },
          alcohol: 5,
          createdAt: '2023-01-01',
        };
        const slotNumber = 1;

        // Mock upsert response
        const mockBeerResponse = {
            tap_number: slotNumber,
            ...draft,
            id: 100, // new ID for beer
            price_glass: 500,
            price_pint: 800,
            is_available: true,
            isNew: false,
            is_event_beer: false,
            created_at: '2023-01-02'
        };

        const mockSingleUpsert = vi.fn().mockResolvedValue({ data: mockBeerResponse, error: null });
        mockUpsert.mockReturnValue({ select: vi.fn(() => ({ single: mockSingleUpsert })) });

        await applyDraftToSlot(draft, slotNumber);

        expect(mockFrom).toHaveBeenCalledWith('beers');
        expect(mockUpsert).toHaveBeenCalledWith(expect.objectContaining({
            tap_number: slotNumber,
            name: draft.name,
            color: draft.color,
            // default values for beer
            is_available: true,
            isNew: true, // Default to true or false? Let's say true for new beer on tap
            is_event_beer: false,
        }), { onConflict: "tap_number" });
    });
  });
});

