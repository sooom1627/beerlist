import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from '../form-field';

describe('FormField', () => {
  it('ラベル、入力欄、エラーメッセージを表示する', () => {
    render(
      <FormField
        id="test-field"
        label="Test Label"
        placeholder="Enter text"
        error="This field is required"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('エラーがない場合はエラーメッセージを表示しない', () => {
    render(
      <FormField
        id="test-field"
        label="Test Label"
        placeholder="Enter text"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('カスタムinputClassNameを適用する', () => {
    render(
      <FormField
        id="test-field"
        label="Test Label"
        inputClassName="custom-class"
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('custom-class');
  });

  it('type属性を正しく設定する', () => {
    render(
      <FormField
        id="test-field"
        label="Test Label"
        type="email"
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('number型の入力をサポートする', () => {
    render(
      <FormField
        id="test-field"
        label="Test Label"
        type="number"
        step="0.1"
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('step', '0.1');
  });

  it('placeholder属性を正しく設定する', () => {
    render(
      <FormField
        id="test-field"
        label="Test Label"
        placeholder="Custom placeholder"
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('placeholder', 'Custom placeholder');
  });
});
