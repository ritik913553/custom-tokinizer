import { Github, Zap } from "lucide-react";
import React from "react";

const Navbar = () => {
    return (
        <div className="bg-gray-800  border-b border-gray-700 ">
            <div className="container mx-auto px-26 py-4 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-gray-900" />
                        </div>
                        <h1 className="text-xl font-bold">
                           Custom Tokenizer
                        </h1>
                    </div>

                    <a href="https://github.com/ritik913553/custom-tokinizer" target="_blank" className="text-sm cursor-pointer border-1 px-2 py-1 rounded-sm bg-yellow-500 text-black">
                        <Github className="inline w-5 h-5 mr-1" />
                        Github
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
