import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [copied, setCopied] = useState(false);
  const [lengthMessage, setLengthMessage] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*?_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 51);
    window.navigator.clipboard.writeText(password);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();

    if (length > 20) {
      setLengthMessage("Password is too long");
    } else {
      setLengthMessage("");
    }

  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-6 text-orange-400">
          <h1 className="text-2xl font-semibold text-center text-white mb-6">🔐 Password Generator</h1>

          <div className="flex items-center rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-600">
            <input
              type="text"
              value={password}
              className="w-full px-4 py-2 bg-gray-700 text-white text-sm placeholder-gray-400 outline-none selection:bg-blue-300 selection:text-white"
              placeholder="Generated password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-sm font-medium transition"
            >
              Copy
            </button>
          </div>

          {copied && (
            <p className="text-green-400 text-sm mb-2 text-center">Copied!</p>
          )}

          {lengthMessage && (
            <p className="text-yellow-400 text-sm mb-2 text-center">{lengthMessage}</p>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="length" className="text-sm font-medium">Password Length</label>
              <span className="text-sm font-semibold text-white">{length}</span>
            </div>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="w-full accent-blue-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />

            <div className="flex items-center justify-between">
              <label htmlFor="numberInput" className="text-sm font-medium">Include Numbers</label>
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                className="accent-blue-500 scale-110"
                onChange={() => setnumberAllowed((prev) => !prev)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="charInput" className="text-sm font-medium">Include Characters</label>
              <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                className="accent-blue-500 scale-110"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
