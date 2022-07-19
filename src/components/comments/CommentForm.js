import { useState } from "react";
import Picker from "emoji-picker-react";
import useClickOutSide from "../../hooks/useClickOutSide";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  textPlaceholder = "Write comment",
}) => {
  const [text, setText] = useState(initialText);
  // const [showPicker, setShowPicker] = useState(false);
  const {
    show: showPicker,
    setShow: setShowPicker,
    nodeRef,
  } = useClickOutSide("span");
  const onEmojiClick = (event, emojiObject) => {
    setText((prevInput) => prevInput + emojiObject.emoji);
    // setShowPicker(false);
  };

  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      handleSubmit(text);
      setText("");
      setShowPicker(false);
    } else {
      handleSubmit(text);
      setText("");
      setShowPicker(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div ref={nodeRef}>
        <div className="flex items-center mb-3">
          <input
            className="h-2 px-5 mr-2 border-none outline-none comment-form-textarea rounded-3xl bg-slate-200 res py-7"
            placeholder={textPlaceholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <span
            className={`cursor-pointer ${
              showPicker ? "text-blue-500" : "text-slate-500"
            }  relative right-11 transition-all`}
            onClick={() => setShowPicker((hi) => !hi)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>
        {showPicker && (
          <div className="relative w-[400px] z-10 inline-block">
            <Picker
              pickerStyle={{ width: "100%" }}
              onEmojiClick={onEmojiClick}
            ></Picker>
          </div>
        )}
      </div>
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
