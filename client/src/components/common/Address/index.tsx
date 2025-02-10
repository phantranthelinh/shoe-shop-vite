import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TAddress } from "@/models/address";
import { Trash } from "lucide-react";

const Address = ({
  data,
  classNames = "",
  onDelete = () => {},
  isDeleted = false,
}: {
  data: TAddress;
  classNames?: string;
  onDelete?: () => void;
  isDeleted?: boolean;
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 shadow-md p-4 border  rounded-xl",
        classNames
      )}
    >
      <div className="flex justify-between space-y-1 text-gray-700 dark:text-gray-300">
        <div>
          <p className="text-black">
            {data.province.name}, {data.district.name}, {data.ward.name}
          </p>
          <p className="text-black">
            <span className="font-medium text-gray-900">
              Tên đường, số nhà:
            </span>{" "}
            {data.addressLine}
          </p>
        </div>
        {isDeleted && (
          <Button onClick={onDelete} variant={"outline"} size={"icon"}>
            <Trash className="fill-current text-red-500" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Address;
