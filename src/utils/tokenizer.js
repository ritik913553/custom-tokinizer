const TokenizerUtils = {
    // Dictionary for common words with predefined token IDs
    commonWords: {
        // Articles
        the: 1,
        a: 2,
        an: 3,

        // Pronouns
        I: 4,
        you: 5,
        he: 6,
        she: 7,
        it: 8,
        we: 9,
        they: 10,
        me: 11,
        him: 12,
        her: 13,
        us: 14,
        them: 15,
        this: 16,
        that: 17,
        these: 18,
        those: 19,

        // Verbs
        is: 20,
        am: 21,
        are: 22,
        was: 23,
        were: 24,
        be: 25,
        been: 26,
        have: 27,
        has: 28,
        had: 29,
        do: 30,
        does: 31,
        did: 32,
        will: 33,
        would: 34,
        could: 35,
        should: 36,
        can: 37,
        may: 38,
        go: 39,
        get: 40,
        make: 41,
        see: 42,
        know: 43,
        take: 44,
        come: 45,
        give: 46,
        say: 47,
        tell: 48,
        think: 49,
        look: 50,

        // Common words
        hello: 51,
        hi: 52,
        hii: 53,
        world: 54,
        and: 55,
        or: 56,
        but: 57,
        if: 58,
        when: 59,
        where: 60,
        why: 61,
        how: 62,
        what: 63,
        who: 64,
        which: 65,
        with: 66,
        without: 67,
        for: 68,
        from: 69,
        to: 70,
        of: 71,
        in: 72,
        on: 73,
        at: 74,
        by: 75,

        // Adjectives
        good: 76,
        bad: 77,
        big: 78,
        small: 79,
        new: 80,
        old: 81,
        hot: 82,
        cold: 83,
        fast: 84,
        slow: 85,
        high: 86,
        low: 87,

        // Numbers
        one: 88,
        two: 89,
        three: 90,
        four: 91,
        five: 92,
        six: 93,
        seven: 94,
        eight: 95,
        nine: 96,
        ten: 97,

        // Punctuation
        ".": 100,
        ",": 101,
        "!": 102,
        "?": 103,
        ";": 104,
        ":": 105,
        "(": 106,
        ")": 107,
        '"': 108,
        "'": 109,
        "-": 110,

        // Whitespace
        " ": 200,
        "  ": 201,
        "\n": 202,
        "\t": 203,
    },

    // Dynamic vocabulary for unknown words (stores ASCII-generated mappings)
    dynamicVocab: {},

    // Reverse lookup for all tokens
    reverseVocab: {},

    // Initialize reverse vocabulary
    init: () => {
        // Build reverse lookup from common words
        TokenizerUtils.reverseVocab = {};
        Object.keys(TokenizerUtils.commonWords).forEach((word) => {
            TokenizerUtils.reverseVocab[TokenizerUtils.commonWords[word]] =
                word;
        });

        // Add dynamic vocab to reverse lookup
        Object.keys(TokenizerUtils.dynamicVocab).forEach((word) => {
            TokenizerUtils.reverseVocab[TokenizerUtils.dynamicVocab[word]] =
                word;
        });
    },

    //Generate consistent token ID based on ASCII values for unknown words
    generateTokenId: (token) => {
        let sum = 0;
        for (let i = 0; i < token.length; i++) {
            sum += token.charCodeAt(i);
        }
        // Add offset to avoid collision with common words (start from 1000)
        return sum + 1000;
    },

    // Get token ID - check dictionary first, then generate and store ASCII-based ID
    getTokenId: (token) => {
        // Check common words dictionary first
        if (TokenizerUtils.commonWords.hasOwnProperty(token)) {
            return TokenizerUtils.commonWords[token];
        }

        // Check lowercase version in common words
        const lowerToken = token.toLowerCase();
        if (TokenizerUtils.commonWords.hasOwnProperty(lowerToken)) {
            return TokenizerUtils.commonWords[lowerToken];
        }

        // Check if already in dynamic vocabulary
        if (TokenizerUtils.dynamicVocab.hasOwnProperty(token)) {
            return TokenizerUtils.dynamicVocab[token];
        }

        // Generate new ASCII-based ID and store mapping
        const newId = TokenizerUtils.generateTokenId(token);
        TokenizerUtils.dynamicVocab[token] = newId;
        TokenizerUtils.reverseVocab[newId] = token;

        return newId;
    },

    // Simple tokenization function with consistent IDs
    tokenize: (text) => {
        if (!text.trim()) return [];

        const words = text
            .split(/(\s+|[.,!?;:()"])/g)
            .filter((token) => token.length > 0);
        return words.map((token, index) => ({
            id: TokenizerUtils.getTokenId(token),
            text: token,
            color: `hsl(${(index * 137.5) % 360}, 70%, 65%)`,
            isCommon:
                TokenizerUtils.commonWords.hasOwnProperty(token) ||
                TokenizerUtils.commonWords.hasOwnProperty(token.toLowerCase()),
        }));
    },

    //Encode text into tokens
    encodeText: (text) => {
        return TokenizerUtils.tokenize(text);
    },
    //Decode token IDs back to text using reverse lookup
    decodeTokenIds: (tokenIds) => {
        if (!tokenIds.trim()) return "";

        const ids = tokenIds
            .split(",")
            .map((id) => parseInt(id.trim()))
            .filter((id) => !isNaN(id));

        const matchedTokens = ids.map((id) => {
            // Use reverse vocabulary for lookup
            return TokenizerUtils.reverseVocab[id] || `[${id}]`;
        });

        return matchedTokens.join("");
    },

    // Get token IDs as comma-separated string
    getTokenIds: (tokens) => {
        return tokens.map((t) => t.id).join(", ");
    },

    //Get dictionary size
    getDictionarySize: () => {
        return Object.keys(TokenizerUtils.commonWords).length;
    },

    //Get total vocabulary size (common + dynamic)
    getTotalVocabSize: () => {
        return (
            Object.keys(TokenizerUtils.commonWords).length +
            Object.keys(TokenizerUtils.dynamicVocab).length
        );
    },

    // Check if token is in dictionary
    isInDictionary: (token) => {
        return (
            TokenizerUtils.commonWords.hasOwnProperty(token) ||
            TokenizerUtils.commonWords.hasOwnProperty(token.toLowerCase())
        );
    },

    //Get current vocabulary (for debugging)
    getVocabulary: () => {
        return {
            common: TokenizerUtils.commonWords,
            dynamic: TokenizerUtils.dynamicVocab,
            reverse: TokenizerUtils.reverseVocab,
        };
    },

    // Reset dynamic vocabulary
    resetDynamicVocab: () => {
        TokenizerUtils.dynamicVocab = {};
        TokenizerUtils.init();
    },
};

// Initialize the tokenizer
TokenizerUtils.init();

export default TokenizerUtils;
