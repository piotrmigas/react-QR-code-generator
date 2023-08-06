import QRCode from 'react-qr-code';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Watch } from 'react-loader-spinner';
import isUrl from 'is-url';

const options = [
  {
    value: 100,
    get text() {
      return `${this.value}x${this.value}`;
    },
  },
  {
    value: 200,
    get text() {
      return `${this.value}x${this.value}`;
    },
  },
  {
    value: 300,
    get text() {
      return `${this.value}x${this.value}`;
    },
  },
  {
    value: 400,
    get text() {
      return `${this.value}x${this.value}`;
    },
  },
];

function App() {
  const [url, setUrl] = useState('');
  const [size, setSize] = useState<number>(options[1].value);
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCode(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowCode(true);
    }, 500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowCode(false);
    setUrl(e.target.value);
  };

  const getHeight = (size: number) =>
    ({
      100: 'h-[100px]',
      200: 'h-[200px]',
      300: 'h-[300px]',
      400: 'h-[400px]',
    }[size]);

  return (
    <div className='flex flex-col max-w-lg mx-auto my-10 gap-10 px-8'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>Url</h2>
        <input
          placeholder='Enter a URL'
          className='w-full border-2 border-gray-200 rounded p-3 text-grey-dark mr-2 focus:outline-none mb-5'
          required
          onChange={handleChange}
        />
        <h2 className='text-base font-semibold leading-7 text-gray-900'>Size</h2>
        <select
          className='w-full border-2 border-gray-200 rounded p-3 text-grey-dark mr-2 focus:outline-none'
          onChange={(e) => {
            setSize(Number(e.target.value));
          }}
          defaultValue={options[1].value}
        >
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <button
          disabled={!isUrl(url)}
          className='bg-gray-600 rounded w-full text-white py-3 px-4 mt-5 disabled:opacity-75'
          type='submit'
        >
          Generate QR Code
        </button>
      </form>
      <div className={`flex justify-center items-center ${getHeight(size)}`}>
        {loading && <Watch width={25} height={25} />}
        {showCode && <QRCode value={url} size={size} />}
      </div>
    </div>
  );
}

export default App;
