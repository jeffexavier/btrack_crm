import { User, Button, Textarea } from "@nextui-org/react";
import { useRef, useState } from "react";
import { ArrowUturnLeftIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon} from "@/public/icons.js";
import formatDateToLocaleString from "@/src/backend/utils/formatDateToLocalString.js";
import { updateComment } from "@/src/backend/utils/comment.js";
import DeleteCommentButton from "./DeleteCommentButton.js";

export default function CommentInput({ comment, commentType }) {
  
  const [isEditable, setIsEditable] = useState(false)
  const [commentDescription, setCommentDescription] = useState({
    description: comment.description
  })

  const commentRef = useRef();
  
  function getRef() {
    const parentRef = commentRef.current.parentElement.parentElement.parentElement.parentElement.style;

    parentRef.borderColor = "#f31260";
    
    if(isEditable === true && commentDescription.length > 0) {
      updateComment(comment._id, commentDescription.description)
      setIsEditable(false)
      parentRef.borderWidth = "0px";
      console.log("editou")
    } else {
      parentRef.borderColor = "#f31260";
    }
  }

   function updateRef() {
    const parentRef = commentRef.current.parentElement.parentElement.parentElement.parentElement.style;
    if (isEditable === false) {
      parentRef.borderWidth = "2px";
      setIsEditable(!isEditable)
      parentRef.borderColor = "#7828c8";
    } else{
      parentRef.borderWidth = "0px";
      setIsEditable(!isEditable)
    }
   }
   
   async function commentUpdate(id, body) {
    if(isEditable === false) {
      updateRef()
    } else if(body.description.length !== 0) {
      const updatedComment = await updateComment(id, body)
      console.log(updatedComment)
      
      updateRef()
    } else {
      const parentRef = commentRef.current.parentElement.parentElement.parentElement.parentElement.style;
      parentRef.borderColor = "#f31260";
    }

    console.log(commentDescription.description)
   }

   function commentDelete(id) {

   }

  function cancelEdit() {
    setCommentDescription({description: comment.description})
    updateRef()
  }

  return (
    <>
      <User
        bordered
        color="secondary"
        src="https://github.com/jeffexavier.png"
        name={comment.created_by.email}
      />
      <div className="flex justify-between gap-4 pr-4 py-2 ml-4 h-fit rounded-md shadow-md mb-6 mt-1">
        <Textarea
          minRows={1}
          ref={commentRef}
          color="secondary"
          bordered
          borderWeight="0"
          helperText={
            comment.dt_update
              ? `Editado em ${formatDateToLocaleString(comment.dt_update)}`
              : ""
          }
          maxRows={5}
          readOnly={!isEditable}
          fullWidth
          aria-label="textarea"
          onChange={(e) => setCommentDescription({description: e.target.value})}
          value={commentDescription.description}
        />
        {
          isEditable === false ? <>{commentType === "comment" ? <Button light auto color="secondary" iconRight={<ArrowUturnLeftIcon width="18px" />} /> : ""}
          <DeleteCommentButton commentId={comment._id} /> </> :  "" 
        }   
        {isEditable === true ? <Button light auto color="error" onPress={() => {cancelEdit()}} iconRight={<XMarkIcon width="20px" />}></Button> : ""}
        <Button light={!isEditable} flat={isEditable} auto color={isEditable === false ? "secondary" : "success"} onPress={() => {commentUpdate(comment._id, commentDescription)}} iconRight={ isEditable === false ? <PencilIcon width="18px" /> : <CheckIcon width="20px" />} />
      </div>
    </>
  );
}
