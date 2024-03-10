import React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*/?";

    for (let i = 1; i <= length; i++) {
      let Character = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(Character);
    }
    setPass(password);
  }, [length, num, char, setPass]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, num, char, passwordGenerator]);

  const passwordRef = useRef(null);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8  text-slate-100 bg-slate-600">
        <h1 className="text-white text-center m-4 text-xl">
          Password Generator
        </h1>
        <div className="flex overflow-hidden shadow rounded-lg mb-4 text-black">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-500 px-3 py-0.5 shrink text-white hover:bg-blue-700"
          >
            copy
          </button>
        </div>
        <div className="w-full items-center flex justify-center">
          <button
            className="bg-blue-500 mb-2 hover:bg-blue-700 rounded-lg text-center p-2 flex text-white self-center"
            onClick={passwordGenerator}
          >
            Change
          </button>
        </div>
        <div className="flex gap-x-3">
          <div className="flex items-center justify-center gap-x-2">
            <input
              min={6}
              max={50}
              type="range"
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
