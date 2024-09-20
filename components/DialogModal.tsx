import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hook";
import { pushSelectedImageIndex, removeSelectedImageIndex } from "@/redux/reducers/nonPersistReducer";
import { removePassportSizeImage } from "@/redux/reducers/persistReducer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  index: string;
  imageId:number
};

const DialogModal = ({ children,index,imageId }: Props) => {
    const dispatch = useAppDispatch();
    const handleAddTextbox = () => {
      dispatch(pushSelectedImageIndex(index))
    }
    const handleRemoveTextbox = () => {
      dispatch(removeSelectedImageIndex(index));
    }
    const handleRemovePhoto = () => {
       dispatch(removePassportSizeImage(imageId));
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleAddTextbox()}>
            Add text box
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRemoveTextbox()}>
            Remove text box
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRemovePhoto()}>
            Remove photo
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DialogModal  ;
