import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hook";
import { removePassportSizePhoto, removePhotoTextbox, setPhotoTextbox } from "@/redux/slices/passportPhotosSlice";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  imageId: number;
};

const DialogModal = ({ children, imageId }: Props) => {

  const dispatch = useAppDispatch();
  const handleAddAfterImageTextbox = () => {
    dispatch(
      setPhotoTextbox({
        imageId,
        textboxLocation: "afterImage",
      })
    );
  };
  const handleAddInImageTextbox = () => {
    dispatch(
      setPhotoTextbox({
        imageId,
        textboxLocation: "inImage",
      })
    );
  };
  const handleRemoveTextbox = () => {
    dispatch(removePhotoTextbox(imageId));
  };
  const handleRemovePhoto = () => {
    dispatch(removePassportSizePhoto(imageId));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleAddInImageTextbox()}>
            Add InImageTextbox
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddAfterImageTextbox()}>
            Add AfterImageTextbox
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

export default DialogModal;
