import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DraftListManager } from '../draft-list-manager';
import { useDrafts, useCreateDraft, useUpdateDraft, useDeleteDraft } from '../../../hooks/useDraftBeers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock hooks
vi.mock('../../../hooks/useDraftBeers');
// Mock BeerForm
vi.mock('../../beer-form', () => ({
  BeerForm: ({ isOpen, onClose, onSubmit }: any) => isOpen ? (
    <div role="dialog" aria-label="beer-form">
      Beer Form
      <button onClick={onClose}>Close</button>
      <button onClick={() => onSubmit({ name: 'New Beer' })}>Submit</button>
    </div>
  ) : null,
}));
// Mock API
vi.mock('../../../api/beers.api', () => ({
  uploadBeerImage: vi.fn().mockResolvedValue('image-url'),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('DraftListManager', () => {
  const mockCreate = vi.fn();
  const mockUpdate = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCreateDraft).mockReturnValue({ mutateAsync: mockCreate } as any);
    vi.mocked(useUpdateDraft).mockReturnValue({ mutateAsync: mockUpdate } as any);
    vi.mocked(useDeleteDraft).mockReturnValue({ mutateAsync: mockDelete } as any);
  });

  it('should render loading state', () => {
    vi.mocked(useDrafts).mockReturnValue({ data: undefined, isLoading: true } as any);
    render(<DraftListManager />, { wrapper });
    // Check for skeleton elements (simplified check)
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('should render drafts and add button', () => {
    const mockDrafts = [
      {
        id: 1,
        name: 'Test Draft',
        brewery: 'Test Brewery',
        price: { glass: 100, pint: 200 },
        // Add other required fields as needed for rendering
      }
    ] as any;
    vi.mocked(useDrafts).mockReturnValue({ data: mockDrafts, isLoading: false } as any);

    render(<DraftListManager />, { wrapper });

    expect(screen.getByText('新しい下書きを追加')).toBeInTheDocument();
    expect(screen.getByText('Test Draft')).toBeInTheDocument();
  });

  it('should open form when add button is clicked', async () => {
    vi.mocked(useDrafts).mockReturnValue({ data: [], isLoading: false } as any);
    render(<DraftListManager />, { wrapper });

    fireEvent.click(screen.getByText('新しい下書きを追加'));

    expect(screen.getByRole('dialog', { name: 'beer-form' })).toBeInTheDocument();
  });

  it('should call create mutation on form submit', async () => {
    vi.mocked(useDrafts).mockReturnValue({ data: [], isLoading: false } as any);
    render(<DraftListManager />, { wrapper });

    fireEvent.click(screen.getByText('新しい下書きを追加'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
    });
  });
});

