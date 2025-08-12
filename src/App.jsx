import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Type, Hash, Eye, Zap } from "lucide-react";
import TokenizerUtils from "./utils/tokenizer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const TokenizerApp = () => {
    const [inputText, setInputText] = useState("");
    const [tokens, setTokens] = useState([]);
    const [tokenIds, setTokenIds] = useState("");
    const [decodedText, setDecodedText] = useState("");

    const encodeText = () => {
        const newTokens = TokenizerUtils.encodeText(inputText);
        setTokens(newTokens);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const decodeTokens = () => {
        const decoded = TokenizerUtils.decodeTokenIds(tokenIds, tokens);
        setDecodedText(decoded);
    };

    const resetAll = () => {
        setInputText("");
        setTokens([]);
        setTokenIds("");
        setDecodedText("");
    };

    useEffect(() => {
        if (inputText) {
            encodeText();
        } else {
            setTokens([]);
        }
    }, [inputText]);

    const encodedIds = TokenizerUtils.getTokenIds(tokens);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 ">
           <Navbar />
            <div className="container max-w-6xl mx-auto  px-6 py-8 space-y-8">
                {/* Text Input Section */}
                <div className=" hide-scroll bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Type className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-semibold">Text Input</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex space-x-2 mb-4">
                            <span
                                onClick={() => setInputText("Hello, world!")}
                                className="px-3 py-1 cursor-pointer bg-gray-700 rounded-full text-sm"
                            >
                                Hello, world!
                            </span>
                            <span
                                onClick={() =>
                                    setInputText("AI tokenization demo")
                                }
                                className="px-3 cursor-pointer py-1 bg-gray-700 rounded-full text-sm"
                            >
                                AI tokenization demo
                            </span>
                            <span
                                onClick={() =>
                                    setInputText("Machine learning rocks!")
                                }
                                className="px-3  cursor-pointer py-1 bg-gray-700 rounded-full text-sm"
                            >
                                Machine learning rocks!
                            </span>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter your text here to tokenize..."
                            className="w-full h-32 bg-gray-900 border border-gray-600 rounded-lg p-4 text-gray-100 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                                {inputText.length} characters
                            </span>
                            <button
                                onClick={resetAll}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Clear</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Token Encoding */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <Hash className="w-5 h-5 text-green-400" />
                            <h2 className="text-lg font-semibold">
                                Token Encoding
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-900 rounded-lg p-4 min-h-[120px] border border-gray-600">
                                {tokens.length > 0 ? (
                                    <div className="text-sm text-gray-300">
                                        <div className="mb-2 text-gray-400">
                                            Encoded Token IDs:
                                        </div>
                                        <div className="font-mono break-all">
                                            {encodedIds}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-center py-8">
                                        Enter text to see token encoding
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => copyToClipboard(encodedIds)}
                                    disabled={!encodedIds}
                                    className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>Copy IDs</span>
                                </button>
                                <button
                                    onClick={() => copyToClipboard(inputText)}
                                    disabled={!inputText}
                                    className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>Copy Text</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Token Decoding */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <RefreshCw className="w-5 h-5 text-purple-400" />
                            <h2 className="text-lg font-semibold">
                                Token Decoding
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Enter comma-separated IDs (e.g., 1, 2, 3):
                                </label>
                                <input
                                    type="text"
                                    value={tokenIds}
                                    onChange={(e) =>
                                        setTokenIds(e.target.value)
                                    }
                                    placeholder="e.g., 1, 2, 3, 4"
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                onClick={decodeTokens}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Decode</span>
                            </button>

                            {decodedText && (
                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                                    <div className="text-sm text-gray-400 mb-2">
                                        Decoded Text:
                                    </div>
                                    <div className="text-gray-100">
                                        {decodedText}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Token Visualization */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Eye className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-lg font-semibold">
                            Token Visualization
                        </h2>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-6 min-h-[200px] border border-gray-600">
                        {tokens.length > 0 ? (
                            <div className="space-y-4">
                                <div className="text-sm text-gray-400 mb-4">
                                    {tokens.length} tokens detected
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tokens.map((token, index) => (
                                        <div
                                            key={index}
                                            className="group relative"
                                        >
                                            <div
                                                className="px-3 py-2 rounded-lg border-2 cursor-pointer transition-all hover:scale-105"
                                                style={{
                                                    backgroundColor:
                                                        token.color + "20",
                                                    borderColor: token.color,
                                                    color: token.color,
                                                }}
                                            >
                                                <span className="font-mono text-sm">
                                                    {token.text}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                ID: {token.id}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center py-12">
                                Enter some text to see the tokenization
                                visualization
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TokenizerApp;
