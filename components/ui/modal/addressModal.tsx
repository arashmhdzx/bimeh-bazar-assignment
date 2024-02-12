'use client'

import { useState, useEffect } from 'react';
import { Button } from '../button';
import AddressProps from '@/types/address';
import { SelectAddress } from '../input';
import CloseIcon from '@/components/icons/generals/close-icon';

interface AddressModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    selectedAddressHandler: (data: AddressProps) => void;
    addresses: AddressProps[] | null | undefined;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onRequestClose, selectedAddressHandler, addresses }) => {
    const [modalStyle, setModalStyle] = useState({
        transform: 'translateY(100%)',
    });
    const [selectedItem, setSelectedItem] = useState<AddressProps | null>(null);


    useEffect(() => {
        if (isOpen) {
            setModalStyle({ transform: 'translateY(0)' });
        } else {
            setModalStyle({ transform: 'translateY(100%)' });
        }
    }, [isOpen]);

    const handleAddressSelect = (data: AddressProps) => {
        setSelectedItem(data);
    };

    const handleSelectButtonClick = () => {
        if (selectedItem) {
            selectedAddressHandler(selectedItem!);
            onRequestClose()
        }
    };

    return (
        <div className={`bottom-modal ${isOpen ? 'open' : ''}`} style={modalStyle}>
            <div className="modal-content">
                <div className='flex justify-between items-center p-5'>
                    <p className='font-semibold'>انتخاب آدرس</p>
                    <button onClick={onRequestClose} className='p-2'>
                        <CloseIcon />
                    </button>
                </div>
                <div className='h-full overflow-y-auto'>
                    {
                        addresses ?
                            <ul className='flex flex-col gap-y-3'>
                                {
                                    addresses.map((el, index) => (
                                        <SelectAddress key={index}
                                            selected={el.id === selectedItem?.id}
                                            onSelect={handleAddressSelect}
                                            data={el} />
                                    ))
                                }
                            </ul>
                            :
                            <p>آدرسی برای نمایش وحود ندارد</p>
                    }
                </div>
                <div className='flex p-5'>
                    <Button onClick={handleSelectButtonClick} text="انتخاب" customStyle='w-full' />
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
