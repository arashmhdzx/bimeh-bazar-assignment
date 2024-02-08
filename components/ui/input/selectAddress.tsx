// SelectAddress.tsx
import AddressProps from "@/types/address"

interface SelectAddressProps {
    data:AddressProps
    selected: boolean;
    onSelect: (data:AddressProps) => void;
}

const SelectAddress: React.FC<SelectAddressProps> = ({ data, selected, onSelect }) => {
    return (
        <li>
            <label className="flex items-start">
                <input type="checkbox" onChange={() => onSelect(data)} checked={selected} />
                <div className="flex flex-col mr-1">
                    <p className=" text-sm font-medium mb-1">{data.name}</p>
                    <p className="text-[#757575] text-sm">{data.details}</p>
                </div>
            </label>
        </li>
    );
}

export default SelectAddress;
