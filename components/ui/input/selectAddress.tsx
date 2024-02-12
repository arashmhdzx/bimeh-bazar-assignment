// SelectAddress.tsx
import AddressProps from "@/types/address"

interface SelectAddressProps {
    data: AddressProps
    selected: boolean;
    onSelect: (data: AddressProps) => void;
}

const SelectAddress: React.FC<SelectAddressProps> = ({ data, selected, onSelect }) => {
    return (
        <li>
            <label className="flex flex-col">
                <div className="flex items-center mb-2">
                    <input type="checkbox" className="checkbox-round" onChange={() => onSelect(data)} checked={selected} />
                    <p className=" text-sm font-medium pr-3">{data.name}</p>
                </div>
                <div className="flex flex-col mr-[36px]">
                    <p className="text-[#757575] text-sm">{data.details}</p>
                </div>
            </label>
        </li>
    );
}

export default SelectAddress;
