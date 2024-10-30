import { TrashIcon } from '@heroicons/react/24/outline';

interface DeleteButtonProps {
    onClick: () => void;
    className?: string;
}

export function DeleteButton({ onClick, className = '' }: DeleteButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`text-red-500 hover:text-red-600 transition-colors ${className}`}
            aria-label="Delete item"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
    );
}
