import { Channel } from 'chatkitty';
import { useState } from 'react';
import TextArea from 'react-autosize-textarea';

interface MessageInputProps {
  channel: Channel;
  sendMessage: (channel: Channel, draft: string) => void;
  updateMessage: (channel: Channel, draft: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  channel,
  sendMessage,
  updateMessage,
}) => {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-row items-center bottom-0 p-4 py-2 bg-gray-100 border-t-4 border-white">
      <button className="pr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <TextArea
        value={input}
        onKeyPress={(evt) => {
          // TODO handle mobile
          if (evt.code === 'Enter') {
            if (input) {
              sendMessage(channel, input);
              setInput('');
            }
          }
        }}
        onChange={(evt) => {
          const { value } = evt.currentTarget;
          updateMessage(channel, value);
          setInput(value);
        }}
        placeholder="Send message"
        style={{
          padding: '8px 12px',
          paddingBottom: 12,
          border: '1px solid lightgray',
          borderRadius: '10px',
          flex: 1,
        }}
      />
      <button
        className="pl-4"
        onClick={() => {
          if (input) {
            sendMessage(channel, input);
            setInput('');
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
