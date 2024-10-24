import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8); // Set initial length to a default value
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charsetAllowed, setCharsetAllowed] = useState(false);
  const [password, setPassword] = useState("Password");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charsetAllowed) str += "`~@#$%^&*()_+{}[];:<>?/=-";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); // Append characters to the password
    }
    setPassword(pass);
  }, [length, numberAllowed, charsetAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charsetAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPasswordToclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center mb-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToclipboard}
            className="bg-blue-600 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)} // Update length state on slider change
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charsetAllowed}
              id="charsetInput"
              onChange={() => {
                setCharsetAllowed((prev) => !prev); // prev old value and !prev is the new value
              }}
            />
            <label htmlFor="charsetInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
