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
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  pushSelectedImageIndex,
  removeSelectedImageIndex,
} from "@/redux/reducers/nonPersistReducer";
import { removePassportSizeImage, setPhotoTextbox } from "@/redux/reducers/persistReducer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  imageId: number;
};

const DialogModal = ({ children, imageId }: Props) => {
  const { passportPhotoIndexes } = useAppSelector( state => state.nonPersistedReducer)
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
    dispatch(removeSelectedImageIndex(imageId));
  };
  const handleRemovePhoto = () => {
    dispatch(removePassportSizeImage(imageId));
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
