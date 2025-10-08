"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import chroma from 'chroma-js';
import { SketchPicker } from 'react-color';
import ColorPaletteGenerator from "./ColorPaletteGenerator";

const Colors = [
    {
        "name": "Amaranth purple",
        "hex": "#AB274F",
        "r": 171,
        "g": 39,
        "b": 79
    },
    {
        "name": "Barn red",
        "hex": "#7C0902",
        "r": 124,
        "g": 9,
        "b": 2
    },
    {
        "name": "Bittersweet",
        "hex": "#FE6F5E",
        "r": 254,
        "g": 111,
        "b": 94
    },
    {
        "name": "Bittersweet shimmer",
        "hex": "#BF4F51",
        "r": 191,
        "g": 79,
        "b": 81
    },
    {
        "name": "Blood red",
        "hex": "#660000",
        "r": 102,
        "g": 0,
        "b": 0
    },
    {
        "name": "Bright pink (Crayola)",
        "hex": "#FB607F",
        "r": 251,
        "g": 96,
        "b": 127
    },
    {
        "name": "Burgundy",
        "hex": "#800020",
        "r": 128,
        "g": 0,
        "b": 32
    },
    {
        "name": "Candy apple red",
        "hex": "#FF0800",
        "r": 255,
        "g": 8,
        "b": 0
    },
    {
        "name": "Cantaloupe melon",
        "hex": "#FDBCB4",
        "r": 253,
        "g": 188,
        "b": 180
    },
    {
        "name": "Cardinal",
        "hex": "#C51E3A",
        "r": 197,
        "g": 30,
        "b": 58
    },
    {
        "name": "Carmine",
        "hex": "#960018",
        "r": 150,
        "g": 0,
        "b": 24
    },
    {
        "name": "Cerise",
        "hex": "#DE3163",
        "r": 222,
        "g": 49,
        "b": 99
    },
    {
        "name": "Chili red",
        "hex": "#E23D28",
        "r": 226,
        "g": 61,
        "b": 40
    },
    {
        "name": "Chocolate cosmos",
        "hex": "#58111A",
        "r": 88,
        "g": 17,
        "b": 26
    },
    {
        "name": "Cinnabar",
        "hex": "#E44D2E",
        "r": 228,
        "g": 77,
        "b": 46
    },
    {
        "name": "Claret",
        "hex": "#7F1734",
        "r": 127,
        "g": 23,
        "b": 52
    },
    {
        "name": "Coquelicot",
        "hex": "#FF3800",
        "r": 255,
        "g": 56,
        "b": 0
    },
    {
        "name": "Coral pink",
        "hex": "#F88379",
        "r": 248,
        "g": 131,
        "b": 121
    },
    {
        "name": "Cordovan",
        "hex": "#893F45",
        "r": 137,
        "g": 63,
        "b": 69
    },
    {
        "name": "Cornell red",
        "hex": "#B31B1B",
        "r": 179,
        "g": 27,
        "b": 27
    },
    {
        "name": "Crimson",
        "hex": "#DC143C",
        "r": 220,
        "g": 20,
        "b": 60
    },
    {
        "name": "Dark red",
        "hex": "#8B0000",
        "r": 139,
        "g": 0,
        "b": 0
    },
    {
        "name": "Falu red",
        "hex": "#801818",
        "r": 128,
        "g": 24,
        "b": 24
    },
    {
        "name": "Fire brick",
        "hex": "#B22222",
        "r": 178,
        "g": 34,
        "b": 34
    },
    {
        "name": "Fire engine red",
        "hex": "#CE2029",
        "r": 206,
        "g": 32,
        "b": 41
    },
    {
        "name": "Folly",
        "hex": "#FF004F",
        "r": 255,
        "g": 0,
        "b": 79
    },
    {
        "name": "Garnet",
        "hex": "#733635",
        "r": 115,
        "g": 54,
        "b": 53
    },
    {
        "name": "Imperial red",
        "hex": "#ED2939",
        "r": 237,
        "g": 41,
        "b": 57
    },
    {
        "name": "Indian red",
        "hex": "#CD5C5C",
        "r": 205,
        "g": 92,
        "b": 92
    },
    {
        "name": "Jasper",
        "hex": "#D05340",
        "r": 208,
        "g": 83,
        "b": 64
    },
    {
        "name": "Light coral",
        "hex": "#F08080",
        "r": 240,
        "g": 128,
        "b": 128
    },
    {
        "name": "Light red",
        "hex": "#FF7F7F",
        "r": 255,
        "g": 127,
        "b": 127
    },
    {
        "name": "Madder",
        "hex": "#A50021",
        "r": 165,
        "g": 0,
        "b": 33
    },
    {
        "name": "Mahogany",
        "hex": "#C04000",
        "r": 192,
        "g": 64,
        "b": 0
    },
    {
        "name": "Maroon",
        "hex": "#800000",
        "r": 128,
        "g": 0,
        "b": 0
    },
    {
        "name": "Misty rose",
        "hex": "#FFE4E1",
        "r": 255,
        "g": 228,
        "b": 225
    },
    {
        "name": "Off Red (RGB)",
        "hex": "#FE0000",
        "r": 254,
        "g": 0,
        "b": 0
    },
    {
        "name": "Old rose",
        "hex": "#C08081",
        "r": 192,
        "g": 128,
        "b": 129
    },
    {
        "name": "OU crimson",
        "hex": "#841617",
        "r": 132,
        "g": 22,
        "b": 23
    },
    {
        "name": "Penn red",
        "hex": "#990000",
        "r": 153,
        "g": 0,
        "b": 0
    },
    {
        "name": "Persian red",
        "hex": "#CC3333",
        "r": 204,
        "g": 51,
        "b": 51
    },
    {
        "name": "Pink",
        "hex": "#FFC0CB",
        "r": 255,
        "g": 192,
        "b": 203
    },
    {
        "name": "Poppy",
        "hex": "#DC343B",
        "r": 220,
        "g": 52,
        "b": 59
    },
    {
        "name": "Red",
        "hex": "#FF0000",
        "r": 255,
        "g": 0,
        "b": 0
    },
    {
        "name": "Red Brown",
        "hex": "#A52A2A",
        "r": 165,
        "g": 42,
        "b": 42
    },
    {
        "name": "Red (CMYK)",
        "hex": "#ED1B24",
        "r": 237,
        "g": 27,
        "b": 36
    },
    {
        "name": "Red (Crayola)",
        "hex": "#EE204E",
        "r": 238,
        "g": 32,
        "b": 78
    },
    {
        "name": "Red (Munsell)",
        "hex": "#F2003C",
        "r": 242,
        "g": 0,
        "b": 60
    },
    {
        "name": "Red (NCS)",
        "hex": "#C40234",
        "r": 196,
        "g": 2,
        "b": 52
    },
    {
        "name": "Red (Pantone)",
        "hex": "#ED2839",
        "r": 237,
        "g": 40,
        "b": 57
    },
    {
        "name": "Redwood",
        "hex": "#AB4E52",
        "r": 171,
        "g": 78,
        "b": 82
    },
    {
        "name": "Rojo",
        "hex": "#E60026",
        "r": 230,
        "g": 0,
        "b": 38
    },
    {
        "name": "Rose",
        "hex": "#FF0080",
        "r": 255,
        "g": 0,
        "b": 128
    },
    {
        "name": "Rose ebony",
        "hex": "#674846",
        "r": 103,
        "g": 72,
        "b": 70
    },
    {
        "name": "Rose red",
        "hex": "#C21E56",
        "r": 194,
        "g": 30,
        "b": 86
    },
    {
        "name": "Rose taupe",
        "hex": "#905D5D",
        "r": 144,
        "g": 93,
        "b": 93
    },
    {
        "name": "Rosewood",
        "hex": "#65000B",
        "r": 101,
        "g": 0,
        "b": 11
    },
    {
        "name": "Rosy brown",
        "hex": "#BC8F8F",
        "r": 188,
        "g": 143,
        "b": 143
    },
    {
        "name": "Rust",
        "hex": "#B7410E",
        "r": 183,
        "g": 65,
        "b": 14
    },
    {
        "name": "Rusty red",
        "hex": "#DA2C43",
        "r": 218,
        "g": 44,
        "b": 67
    },
    {
        "name": "Salmon",
        "hex": "#FA8072",
        "r": 250,
        "g": 128,
        "b": 114
    },
    {
        "name": "Salmon pink",
        "hex": "#FF91A4",
        "r": 255,
        "g": 145,
        "b": 164
    },
    {
        "name": "Scarlet",
        "hex": "#FF2400",
        "r": 255,
        "g": 36,
        "b": 0
    },
    {
        "name": "Syracuse Red Orange",
        "hex": "#D44500",
        "r": 212,
        "g": 69,
        "b": 0
    },
    {
        "name": "Tea rose (red)",
        "hex": "#F4C2C2",
        "r": 244,
        "g": 194,
        "b": 194
    },
    {
        "name": "Tomato",
        "hex": "#FF6347",
        "r": 255,
        "g": 99,
        "b": 71
    },
    {
        "name": "Turkey red",
        "hex": "#A91101",
        "r": 169,
        "g": 17,
        "b": 1
    },
    {
        "name": "Vermilion",
        "hex": "#E34234",
        "r": 227,
        "g": 66,
        "b": 52
    },
    {
        "name": "Wine",
        "hex": "#722F37",
        "r": 114,
        "g": 47,
        "b": 55
    },
    {
        "name": "Aerospace orange",
        "hex": "#FF4F00",
        "r": 255,
        "g": 79,
        "b": 0
    },
    {
        "name": "Alloy orange",
        "hex": "#C46210",
        "r": 196,
        "g": 98,
        "b": 16
    },
    {
        "name": "Amber",
        "hex": "#FFBF00",
        "r": 255,
        "g": 191,
        "b": 0
    },
    {
        "name": "Apricot",
        "hex": "#FBCEB1",
        "r": 251,
        "g": 206,
        "b": 177
    },
    {
        "name": "Atomic tangerine",
        "hex": "#FF9966",
        "r": 255,
        "g": 153,
        "b": 102
    },
    {
        "name": "Brown",
        "hex": "#964B00",
        "r": 150,
        "g": 75,
        "b": 0
    },
    {
        "name": "Burnt orange",
        "hex": "#BF5700",
        "r": 191,
        "g": 87,
        "b": 0
    },
    {
        "name": "Butterscotch",
        "hex": "#E09540",
        "r": 224,
        "g": 149,
        "b": 64
    },
    {
        "name": "Carrot orange",
        "hex": "#ED9121",
        "r": 237,
        "g": 145,
        "b": 33
    },
    {
        "name": "Champagne (color)",
        "hex": "#F7E7CE",
        "r": 247,
        "g": 231,
        "b": 206
    },
    {
        "name": "Coral",
        "hex": "#FF7F50",
        "r": 255,
        "g": 127,
        "b": 80
    },
    {
        "name": "Dark orange (web)",
        "hex": "#FF8C00",
        "r": 255,
        "g": 140,
        "b": 0
    },
    {
        "name": "Desert sand (color)",
        "hex": "#EDC9AF",
        "r": 237,
        "g": 201,
        "b": 175
    },
    {
        "name": "Engineering orange",
        "hex": "#BA160C",
        "r": 186,
        "g": 22,
        "b": 12
    },
    {
        "name": "Flame",
        "hex": "#E25822",
        "r": 226,
        "g": 88,
        "b": 34
    },
    {
        "name": "Giants orange",
        "hex": "#FE5A1D",
        "r": 254,
        "g": 90,
        "b": 29
    },
    {
        "name": "Gold",
        "hex": "#FFD700",
        "r": 255,
        "g": 215,
        "b": 0
    },
    {
        "name": "Golden Gate Bridge",
        "hex": "#F04A00",
        "r": 240,
        "g": 74,
        "b": 0
    },
    {
        "name": "Goldenrod",
        "hex": "#DAA520",
        "r": 218,
        "g": 165,
        "b": 32
    },
    {
        "name": "Hunyadi yellow",
        "hex": "#E8AC41",
        "r": 232,
        "g": 172,
        "b": 65
    },
    {
        "name": "Light orange",
        "hex": "#FED8B1",
        "r": 254,
        "g": 216,
        "b": 177
    },
    {
        "name": "Orange (Crayola)",
        "hex": "#FF7538",
        "r": 255,
        "g": 117,
        "b": 56
    },
    {
        "name": "Orange (Pantone)",
        "hex": "#FF5800",
        "r": 255,
        "g": 88,
        "b": 0
    },
    {
        "name": "Orange peel",
        "hex": "#FFA000",
        "r": 255,
        "g": 160,
        "b": 0
    },
    {
        "name": "Orange (web)",
        "hex": "#FFA500",
        "r": 255,
        "g": 165,
        "b": 0
    },
    {
        "name": "Orange (wheel)",
        "hex": "#FF8000",
        "r": 255,
        "g": 128,
        "b": 0
    },
    {
        "name": "Papaya whip",
        "hex": "#FFEFD5",
        "r": 255,
        "g": 239,
        "b": 213
    },
    {
        "name": "Peach",
        "hex": "#FFE5B4",
        "r": 255,
        "g": 229,
        "b": 180
    },
    {
        "name": "Persian orange",
        "hex": "#D99058",
        "r": 217,
        "g": 144,
        "b": 88
    },
    {
        "name": "Persimmon",
        "hex": "#EC5800",
        "r": 236,
        "g": 88,
        "b": 0
    },
    {
        "name": "Princeton orange",
        "hex": "#FF8F00",
        "r": 255,
        "g": 143,
        "b": 0
    },
    {
        "name": "Pumpkin",
        "hex": "#FF7518",
        "r": 255,
        "g": 117,
        "b": 24
    },
    {
        "name": "Safety orange",
        "hex": "#FF7900",
        "r": 255,
        "g": 121,
        "b": 0
    },
    {
        "name": "Saffron",
        "hex": "#F4C430",
        "r": 244,
        "g": 196,
        "b": 48
    },
    {
        "name": "Spanish orange",
        "hex": "#E86100",
        "r": 232,
        "g": 97,
        "b": 0
    },
    {
        "name": "Tangelo",
        "hex": "#F94D00",
        "r": 249,
        "g": 77,
        "b": 0
    },
    {
        "name": "Tangerine",
        "hex": "#F28500",
        "r": 242,
        "g": 133,
        "b": 0
    },
    {
        "name": "Tawny",
        "hex": "#CD5700",
        "r": 205,
        "g": 87,
        "b": 0
    },
    {
        "name": "Tiger’s Eye",
        "hex": "#B56917",
        "r": 181,
        "g": 105,
        "b": 23
    },
    {
        "name": "UT orange",
        "hex": "#FF8200",
        "r": 255,
        "g": 130,
        "b": 0
    },
    {
        "name": "Xanthous",
        "hex": "#F1B42F",
        "r": 241,
        "g": 180,
        "b": 47
    },
    {
        "name": "Almond",
        "hex": "#EFDECD",
        "r": 239,
        "g": 222,
        "b": 205
    },
    {
        "name": "Beaver",
        "hex": "#9F8170",
        "r": 159,
        "g": 129,
        "b": 112
    },
    {
        "name": "Beige",
        "hex": "#F5F5DC",
        "r": 245,
        "g": 245,
        "b": 220
    },
    {
        "name": "Bistre",
        "hex": "#3D2B1F",
        "r": 61,
        "g": 43,
        "b": 31
    },
    {
        "name": "Black bean",
        "hex": "#3D0C02",
        "r": 61,
        "g": 12,
        "b": 2
    },
    {
        "name": "Black olive",
        "hex": "#3B3C36",
        "r": 59,
        "g": 60,
        "b": 54
    },
    {
        "name": "Bole",
        "hex": "#79443B",
        "r": 121,
        "g": 68,
        "b": 59
    },
    {
        "name": "Bone",
        "hex": "#E3DAC9",
        "r": 227,
        "g": 218,
        "b": 201
    },
    {
        "name": "Bronze",
        "hex": "#CD7F32",
        "r": 205,
        "g": 127,
        "b": 50
    },
    {
        "name": "Brown",
        "hex": "#993300",
        "r": 153,
        "g": 51,
        "b": 0
    },
    {
        "name": "Brown sugar",
        "hex": "#AF6E4D",
        "r": 175,
        "g": 110,
        "b": 77
    },
    {
        "name": "Buff",
        "hex": "#DAA06D",
        "r": 218,
        "g": 160,
        "b": 109
    },
    {
        "name": "Burnt sienna",
        "hex": "#E97451",
        "r": 233,
        "g": 116,
        "b": 81
    },
    {
        "name": "Burnt umber",
        "hex": "#8A3324",
        "r": 138,
        "g": 51,
        "b": 36
    },
    {
        "name": "Camel",
        "hex": "#C19A6B",
        "r": 193,
        "g": 154,
        "b": 107
    },
    {
        "name": "Caput mortuum",
        "hex": "#592720",
        "r": 89,
        "g": 39,
        "b": 32
    },
    {
        "name": "Caramel",
        "hex": "#CC7F3B",
        "r": 204,
        "g": 127,
        "b": 59
    },
    {
        "name": "Chamoisee",
        "hex": "#A0785A",
        "r": 160,
        "g": 120,
        "b": 90
    },
    {
        "name": "Chestnut",
        "hex": "#954535",
        "r": 149,
        "g": 69,
        "b": 53
    },
    {
        "name": "Chocolate",
        "hex": "#7B3F00",
        "r": 123,
        "g": 63,
        "b": 0
    },
    {
        "name": "Citron",
        "hex": "#DDD06A",
        "r": 221,
        "g": 208,
        "b": 106
    },
    {
        "name": "Cocoa Brown",
        "hex": "#D2691E",
        "r": 210,
        "g": 105,
        "b": 30
    },
    {
        "name": "Coffee",
        "hex": "#6F4E37",
        "r": 111,
        "g": 78,
        "b": 55
    },
    {
        "name": "Copper",
        "hex": "#B87333",
        "r": 184,
        "g": 115,
        "b": 51
    },
    {
        "name": "Coyote",
        "hex": "#81613E",
        "r": 129,
        "g": 97,
        "b": 62
    },
    {
        "name": "Drab dark brown",
        "hex": "#4A412A",
        "r": 74,
        "g": 65,
        "b": 42
    },
    {
        "name": "Dun",
        "hex": "#DAC8AE",
        "r": 218,
        "g": 200,
        "b": 174
    },
    {
        "name": "Earth yellow",
        "hex": "#E1A95F",
        "r": 225,
        "g": 169,
        "b": 95
    },
    {
        "name": "Ecru",
        "hex": "#C2B280",
        "r": 194,
        "g": 178,
        "b": 128
    },
    {
        "name": "Fawn",
        "hex": "#E5AA70",
        "r": 229,
        "g": 170,
        "b": 112
    },
    {
        "name": "Field drab",
        "hex": "#6C541E",
        "r": 108,
        "g": 84,
        "b": 30
    },
    {
        "name": "Fulvous",
        "hex": "#E48400",
        "r": 228,
        "g": 132,
        "b": 0
    },
    {
        "name": "Golden brown",
        "hex": "#996515",
        "r": 153,
        "g": 101,
        "b": 21
    },
    {
        "name": "Harvest gold",
        "hex": "#DA9100",
        "r": 218,
        "g": 145,
        "b": 0
    },
    {
        "name": "Khaki",
        "hex": "#C3B091",
        "r": 195,
        "g": 176,
        "b": 145
    },
    {
        "name": "Kobicha",
        "hex": "#6B4423",
        "r": 107,
        "g": 68,
        "b": 35
    },
    {
        "name": "Liver",
        "hex": "#674C47",
        "r": 103,
        "g": 76,
        "b": 71
    },
    {
        "name": "Ochre",
        "hex": "#CC7722",
        "r": 204,
        "g": 119,
        "b": 34
    },
    {
        "name": "Raw umber",
        "hex": "#926644",
        "r": 146,
        "g": 102,
        "b": 68
    },
    {
        "name": "Redwood",
        "hex": "#A45A52",
        "r": 164,
        "g": 90,
        "b": 82
    },
    {
        "name": "Rufous",
        "hex": "#A81C07",
        "r": 168,
        "g": 28,
        "b": 7
    },
    {
        "name": "Russet",
        "hex": "#80461B",
        "r": 128,
        "g": 70,
        "b": 27
    },
    {
        "name": "Sandy brown",
        "hex": "#F4A460",
        "r": 244,
        "g": 164,
        "b": 96
    },
    {
        "name": "Satin sheen gold",
        "hex": "#CBA135",
        "r": 203,
        "g": 161,
        "b": 53
    },
    {
        "name": "Seal brown",
        "hex": "#59260B",
        "r": 89,
        "g": 38,
        "b": 11
    },
    {
        "name": "Sepia",
        "hex": "#704214",
        "r": 112,
        "g": 66,
        "b": 20
    },
    {
        "name": "Sienna",
        "hex": "#882D17",
        "r": 136,
        "g": 45,
        "b": 23
    },
    {
        "name": "Sinopia",
        "hex": "#CB410B",
        "r": 203,
        "g": 65,
        "b": 11
    },
    {
        "name": "Tan",
        "hex": "#D2B48C",
        "r": 210,
        "g": 180,
        "b": 140
    },
    {
        "name": "Taupe",
        "hex": "#483C32",
        "r": 72,
        "g": 60,
        "b": 50
    },
    {
        "name": "Umber",
        "hex": "#635147",
        "r": 99,
        "g": 81,
        "b": 71
    },
    {
        "name": "Van Dyke",
        "hex": "#44362F",
        "r": 68,
        "g": 54,
        "b": 47
    },
    {
        "name": "Walnut brown",
        "hex": "#5C5248",
        "r": 92,
        "g": 82,
        "b": 72
    },
    {
        "name": "Wenge",
        "hex": "#645452",
        "r": 100,
        "g": 84,
        "b": 82
    },
    {
        "name": "Wheat",
        "hex": "#F5DEB3",
        "r": 245,
        "g": 222,
        "b": 179
    },
    {
        "name": "Arylide yellow",
        "hex": "#E9D66B",
        "r": 233,
        "g": 214,
        "b": 107
    },
    {
        "name": "Aureolin",
        "hex": "#FDEE00",
        "r": 253,
        "g": 238,
        "b": 0
    },
    {
        "name": "Buff",
        "hex": "#E0AB76",
        "r": 224,
        "g": 171,
        "b": 118
    },
    {
        "name": "Canary",
        "hex": "#FFEF00",
        "r": 255,
        "g": 239,
        "b": 0
    },
    {
        "name": "Chartreuse",
        "hex": "#DFFF00",
        "r": 223,
        "g": 255,
        "b": 0
    },
    {
        "name": "Citrine",
        "hex": "#E4D00A",
        "r": 228,
        "g": 208,
        "b": 10
    },
    {
        "name": "Cosmic latte",
        "hex": "#FFF8E7",
        "r": 255,
        "g": 248,
        "b": 231
    },
    {
        "name": "Cream",
        "hex": "#FFFDD0",
        "r": 255,
        "g": 253,
        "b": 208
    },
    {
        "name": "Dark goldenrod",
        "hex": "#B8860B",
        "r": 184,
        "g": 134,
        "b": 11
    },
    {
        "name": "Ecru",
        "hex": "#CDB280",
        "r": 205,
        "g": 178,
        "b": 128
    },
    {
        "name": "Flax",
        "hex": "#EEDC82",
        "r": 238,
        "g": 220,
        "b": 130
    },
    {
        "name": "Gamboge",
        "hex": "#EF9B0F",
        "r": 239,
        "g": 155,
        "b": 15
    },
    {
        "name": "Gold (metallic)",
        "hex": "#D4AF37",
        "r": 212,
        "g": 175,
        "b": 55
    },
    {
        "name": "Harvest gold",
        "hex": "#E6A817",
        "r": 230,
        "g": 168,
        "b": 23
    },
    {
        "name": "Icterine",
        "hex": "#FCF75E",
        "r": 252,
        "g": 247,
        "b": 94
    },
    {
        "name": "Ivory",
        "hex": "#FFFFF0",
        "r": 255,
        "g": 255,
        "b": 240
    },
    {
        "name": "Jasmine",
        "hex": "#F8DE7E",
        "r": 248,
        "g": 222,
        "b": 126
    },
    {
        "name": "Jonquil",
        "hex": "#FACA16",
        "r": 250,
        "g": 202,
        "b": 22
    },
    {
        "name": "Lemon chiffon",
        "hex": "#FFFACD",
        "r": 255,
        "g": 250,
        "b": 205
    },
    {
        "name": "Lemon Lime",
        "hex": "#E3FF00",
        "r": 227,
        "g": 255,
        "b": 0
    },
    {
        "name": "Light yellow",
        "hex": "#FFFFE0",
        "r": 255,
        "g": 255,
        "b": 224
    },
    {
        "name": "Maize",
        "hex": "#FBEC5D",
        "r": 251,
        "g": 236,
        "b": 93
    },
    {
        "name": "Mikado yellow",
        "hex": "#FFC40C",
        "r": 255,
        "g": 196,
        "b": 12
    },
    {
        "name": "Mindaro",
        "hex": "#E3F988",
        "r": 227,
        "g": 249,
        "b": 136
    },
    {
        "name": "Mustard",
        "hex": "#FFDB58",
        "r": 255,
        "g": 219,
        "b": 88
    },
    {
        "name": "Naples yellow",
        "hex": "#FADA5E",
        "r": 250,
        "g": 218,
        "b": 94
    },
    {
        "name": "Navajo white",
        "hex": "#FFDEAD",
        "r": 255,
        "g": 222,
        "b": 173
    },
    {
        "name": "Old gold",
        "hex": "#CFB53B",
        "r": 207,
        "g": 181,
        "b": 59
    },
    {
        "name": "Olive",
        "hex": "#808000",
        "r": 128,
        "g": 128,
        "b": 0
    },
    {
        "name": "Peach Yellow",
        "hex": "#FADFAD",
        "r": 250,
        "g": 223,
        "b": 173
    },
    {
        "name": "Pear",
        "hex": "#D1E231",
        "r": 209,
        "g": 226,
        "b": 49
    },
    {
        "name": "Saffron",
        "hex": "#F4C431",
        "r": 244,
        "g": 196,
        "b": 49
    },
    {
        "name": "School bus yellow",
        "hex": "#FFD800",
        "r": 255,
        "g": 216,
        "b": 0
    },
    {
        "name": "Selective yellow",
        "hex": "#FFBA00",
        "r": 255,
        "g": 186,
        "b": 0
    },
    {
        "name": "Straw",
        "hex": "#E4D96F",
        "r": 228,
        "g": 217,
        "b": 111
    },
    {
        "name": "Sunglow",
        "hex": "#FFCC33",
        "r": 255,
        "g": 204,
        "b": 51
    },
    {
        "name": "Sunset",
        "hex": "#FAD6A5",
        "r": 250,
        "g": 214,
        "b": 165
    },
    {
        "name": "Vanilla",
        "hex": "#F3E5AB",
        "r": 243,
        "g": 229,
        "b": 171
    },
    {
        "name": "Yellow",
        "hex": "#FFFF00",
        "r": 255,
        "g": 255,
        "b": 0
    },
    {
        "name": "Apple green",
        "hex": "#8DB600",
        "r": 141,
        "g": 182,
        "b": 0
    },
    {
        "name": "Aquamarine",
        "hex": "#00FFBF",
        "r": 0,
        "g": 255,
        "b": 191
    },
    {
        "name": "Asparagus",
        "hex": "#7BA05B",
        "r": 123,
        "g": 160,
        "b": 91
    },
    {
        "name": "Avocado",
        "hex": "#568203",
        "r": 86,
        "g": 130,
        "b": 3
    },
    {
        "name": "Bright green",
        "hex": "#66FF00",
        "r": 102,
        "g": 255,
        "b": 0
    },
    {
        "name": "British racing green",
        "hex": "#004225",
        "r": 0,
        "g": 66,
        "b": 37
    },
    {
        "name": "Brunswick green",
        "hex": "#1B4D3E",
        "r": 27,
        "g": 77,
        "b": 62
    },
    {
        "name": "Cal Poly green",
        "hex": "#1E4D2B",
        "r": 30,
        "g": 77,
        "b": 43
    },
    {
        "name": "Castleton green",
        "hex": "#00563B",
        "r": 0,
        "g": 86,
        "b": 59
    },
    {
        "name": "Celadon",
        "hex": "#ACE1AF",
        "r": 172,
        "g": 225,
        "b": 175
    },
    {
        "name": "Chartreuse",
        "hex": "#80FF00",
        "r": 128,
        "g": 255,
        "b": 0
    },
    {
        "name": "Cyan",
        "hex": "#00FFFF",
        "r": 0,
        "g": 255,
        "b": 255
    },
    {
        "name": "Dark green",
        "hex": "#013220",
        "r": 1,
        "g": 50,
        "b": 32
    },
    {
        "name": "Dark moss green",
        "hex": "#4A5D23",
        "r": 74,
        "g": 93,
        "b": 35
    },
    {
        "name": "Dark pastel green",
        "hex": "#03C03C",
        "r": 3,
        "g": 192,
        "b": 60
    },
    {
        "name": "Dark spring green",
        "hex": "#177245",
        "r": 23,
        "g": 114,
        "b": 69
    },
    {
        "name": "Dartmouth green",
        "hex": "#00693E",
        "r": 0,
        "g": 105,
        "b": 62
    },
    {
        "name": "Emerald",
        "hex": "#50C878",
        "r": 80,
        "g": 200,
        "b": 120
    },
    {
        "name": "Erin",
        "hex": "#00FF40",
        "r": 0,
        "g": 255,
        "b": 64
    },
    {
        "name": "Fern green",
        "hex": "#4F7942",
        "r": 79,
        "g": 121,
        "b": 66
    },
    {
        "name": "Forest green",
        "hex": "#228B22",
        "r": 34,
        "g": 139,
        "b": 34
    },
    {
        "name": "Green",
        "hex": "#00FF00",
        "r": 0,
        "g": 255,
        "b": 0
    },
    {
        "name": "Green Yellow",
        "hex": "#ADFF2F",
        "r": 173,
        "g": 255,
        "b": 47
    },
    {
        "name": "Harlequin",
        "hex": "#3FFF00",
        "r": 63,
        "g": 255,
        "b": 0
    },
    {
        "name": "Honeydew",
        "hex": "#F0FFF0",
        "r": 240,
        "g": 255,
        "b": 240
    },
    {
        "name": "Hooker's green",
        "hex": "#49796B",
        "r": 73,
        "g": 121,
        "b": 107
    },
    {
        "name": "Hunter green",
        "hex": "#355E3B",
        "r": 53,
        "g": 94,
        "b": 59
    },
    {
        "name": "India green",
        "hex": "#138808",
        "r": 19,
        "g": 136,
        "b": 8
    },
    {
        "name": "Jade",
        "hex": "#00A86B",
        "r": 0,
        "g": 168,
        "b": 107
    },
    {
        "name": "Jungle green",
        "hex": "#29AB87",
        "r": 41,
        "g": 171,
        "b": 135
    },
    {
        "name": "Kelly green",
        "hex": "#4CBB17",
        "r": 76,
        "g": 187,
        "b": 23
    },
    {
        "name": "Lawn green",
        "hex": "#7CFC00",
        "r": 124,
        "g": 252,
        "b": 0
    },
    {
        "name": "Light green",
        "hex": "#90EE90",
        "r": 144,
        "g": 238,
        "b": 144
    },
    {
        "name": "Lime",
        "hex": "#C0FF00",
        "r": 192,
        "g": 255,
        "b": 0
    },
    {
        "name": "Lime green",
        "hex": "#32CD32",
        "r": 50,
        "g": 205,
        "b": 50
    },
    {
        "name": "Malachite",
        "hex": "#0BDA51",
        "r": 11,
        "g": 218,
        "b": 81
    },
    {
        "name": "Mantis",
        "hex": "#74C365",
        "r": 116,
        "g": 195,
        "b": 101
    },
    {
        "name": "Midnight green",
        "hex": "#004953",
        "r": 0,
        "g": 73,
        "b": 83
    },
    {
        "name": "Mint",
        "hex": "#3EB489",
        "r": 62,
        "g": 180,
        "b": 137
    },
    {
        "name": "Moss green",
        "hex": "#8A9A5B",
        "r": 138,
        "g": 154,
        "b": 91
    },
    {
        "name": "Myrtle green",
        "hex": "#317873",
        "r": 49,
        "g": 120,
        "b": 115
    },
    {
        "name": "Neon green",
        "hex": "#39FF14",
        "r": 57,
        "g": 255,
        "b": 20
    },
    {
        "name": "Office green",
        "hex": "#008000",
        "r": 0,
        "g": 128,
        "b": 0
    },
    {
        "name": "Olivine",
        "hex": "#9AB973",
        "r": 154,
        "g": 185,
        "b": 115
    },
    {
        "name": "Pakistan green",
        "hex": "#00401A",
        "r": 0,
        "g": 64,
        "b": 26
    },
    {
        "name": "Persian green",
        "hex": "#00A693",
        "r": 0,
        "g": 166,
        "b": 147
    },
    {
        "name": "Pigment green",
        "hex": "#00A550",
        "r": 0,
        "g": 165,
        "b": 80
    },
    {
        "name": "Pine green",
        "hex": "#01796F",
        "r": 1,
        "g": 121,
        "b": 111
    },
    {
        "name": "Pistachio",
        "hex": "#93C572",
        "r": 147,
        "g": 197,
        "b": 114
    },
    {
        "name": "Reseda green",
        "hex": "#6C7C59",
        "r": 108,
        "g": 124,
        "b": 89
    },
    {
        "name": "Robin egg blue",
        "hex": "#00CCCC",
        "r": 0,
        "g": 204,
        "b": 204
    },
    {
        "name": "Sage",
        "hex": "#BCB88A",
        "r": 188,
        "g": 184,
        "b": 138
    },
    {
        "name": "Screamin' green",
        "hex": "#76FF7A",
        "r": 118,
        "g": 255,
        "b": 122
    },
    {
        "name": "Sea green",
        "hex": "#2E8B57",
        "r": 46,
        "g": 139,
        "b": 87
    },
    {
        "name": "SGBUS green",
        "hex": "#55DD33",
        "r": 85,
        "g": 221,
        "b": 51
    },
    {
        "name": "Shamrock green",
        "hex": "#009E60",
        "r": 0,
        "g": 158,
        "b": 96
    },
    {
        "name": "Spring bud",
        "hex": "#A7FC00",
        "r": 167,
        "g": 252,
        "b": 0
    },
    {
        "name": "Spring green",
        "hex": "#00FF7F",
        "r": 0,
        "g": 255,
        "b": 127
    },
    {
        "name": "Tea green",
        "hex": "#D0F0C0",
        "r": 208,
        "g": 240,
        "b": 192
    },
    {
        "name": "Teal",
        "hex": "#008080",
        "r": 0,
        "g": 128,
        "b": 128
    },
    {
        "name": "Turquoise",
        "hex": "#40E0D0",
        "r": 64,
        "g": 224,
        "b": 208
    },
    {
        "name": "Viridian",
        "hex": "#40826D",
        "r": 64,
        "g": 130,
        "b": 109
    },
    {
        "name": "Yellow Green",
        "hex": "#9ACD32",
        "r": 154,
        "g": 205,
        "b": 50
    },
    {
        "name": "Alice blue",
        "hex": "#F0F8FF",
        "r": 240,
        "g": 248,
        "b": 255
    },
    {
        "name": "Aqua",
        "hex": "#0FFFFF",
        "r": 15,
        "g": 255,
        "b": 255
    },
    {
        "name": "Aquamarine",
        "hex": "#7FFFD4",
        "r": 127,
        "g": 255,
        "b": 212
    },
    {
        "name": "Azure",
        "hex": "#007FFF",
        "r": 0,
        "g": 127,
        "b": 255
    },
    {
        "name": "Azure (web)",
        "hex": "#F0FFFF",
        "r": 240,
        "g": 255,
        "b": 255
    },
    {
        "name": "Blue Green",
        "hex": "#0D98BA",
        "r": 13,
        "g": 152,
        "b": 186
    },
    {
        "name": "Capri",
        "hex": "#00BFFF",
        "r": 0,
        "g": 191,
        "b": 255
    },
    {
        "name": "Caribbean Current",
        "hex": "#006D6F",
        "r": 0,
        "g": 109,
        "b": 111
    },
    {
        "name": "Celeste",
        "hex": "#B2FFFF",
        "r": 178,
        "g": 255,
        "b": 255
    },
    {
        "name": "Cerulean",
        "hex": "#007BA7",
        "r": 0,
        "g": 123,
        "b": 167
    },
    {
        "name": "Dark cyan",
        "hex": "#008B8B",
        "r": 0,
        "g": 139,
        "b": 139
    },
    {
        "name": "Electric blue",
        "hex": "#7DF9FF",
        "r": 125,
        "g": 249,
        "b": 255
    },
    {
        "name": "Fluorescent cyan",
        "hex": "#15F4EE",
        "r": 21,
        "g": 244,
        "b": 238
    },
    {
        "name": "Keppel",
        "hex": "#3AB09E",
        "r": 58,
        "g": 176,
        "b": 158
    },
    {
        "name": "Ice blue",
        "hex": "#99FFFF",
        "r": 153,
        "g": 255,
        "b": 255
    },
    {
        "name": "Light cyan",
        "hex": "#E0FFFF",
        "r": 224,
        "g": 255,
        "b": 255
    },
    {
        "name": "Light sea green",
        "hex": "#20B2AA",
        "r": 32,
        "g": 178,
        "b": 170
    },
    {
        "name": "Mint green",
        "hex": "#DFFFFD",
        "r": 223,
        "g": 255,
        "b": 253
    },
    {
        "name": "Moonstone",
        "hex": "#3AA8C1",
        "r": 58,
        "g": 168,
        "b": 193
    },
    {
        "name": "Pacific cyan",
        "hex": "#1CA9C9",
        "r": 28,
        "g": 169,
        "b": 201
    },
    {
        "name": "Process Cyan",
        "hex": "#00B7EB",
        "r": 0,
        "g": 183,
        "b": 235
    },
    {
        "name": "Skobeloff",
        "hex": "#007A74",
        "r": 0,
        "g": 122,
        "b": 116
    },
    {
        "name": "Tiffany Blue",
        "hex": "#81D8D0",
        "r": 129,
        "g": 216,
        "b": 208
    },
    {
        "name": "Verdigris",
        "hex": "#43B3AE",
        "r": 67,
        "g": 179,
        "b": 174
    },
    {
        "name": "Vivid sky blue",
        "hex": "#00CCFF",
        "r": 0,
        "g": 204,
        "b": 255
    },
    {
        "name": "Zomp",
        "hex": "#39A78D",
        "r": 57,
        "g": 167,
        "b": 141
    },
    {
        "name": "Aero",
        "hex": "#00B9E8",
        "r": 0,
        "g": 185,
        "b": 232
    },
    {
        "name": "Air Force blue",
        "hex": "#5D8AA8",
        "r": 93,
        "g": 138,
        "b": 168
    },
    {
        "name": "Air superiority blue",
        "hex": "#72A0C1",
        "r": 114,
        "g": 160,
        "b": 193
    },
    {
        "name": "Argentinian Blue",
        "hex": "#6CB4EE",
        "r": 108,
        "g": 180,
        "b": 238
    },
    {
        "name": "Azul",
        "hex": "#0070BB",
        "r": 0,
        "g": 112,
        "b": 187
    },
    {
        "name": "Baby blue",
        "hex": "#89CFF0",
        "r": 137,
        "g": 207,
        "b": 240
    },
    {
        "name": "Berkeley Blue",
        "hex": "#003262",
        "r": 0,
        "g": 50,
        "b": 98
    },
    {
        "name": "Bice blue",
        "hex": "#2072AF",
        "r": 32,
        "g": 114,
        "b": 175
    },
    {
        "name": "Bleu de France",
        "hex": "#318CE7",
        "r": 49,
        "g": 140,
        "b": 231
    },
    {
        "name": "Blue",
        "hex": "#0000FF",
        "r": 0,
        "g": 0,
        "b": 255
    },
    {
        "name": "Blue Gray",
        "hex": "#6699CC",
        "r": 102,
        "g": 153,
        "b": 204
    },
    {
        "name": "Bondi blue",
        "hex": "#0095B6",
        "r": 0,
        "g": 149,
        "b": 182
    },
    {
        "name": "Brandeis blue",
        "hex": "#0070FF",
        "r": 0,
        "g": 112,
        "b": 255
    },
    {
        "name": "Byzantine blue",
        "hex": "#3457D5",
        "r": 52,
        "g": 87,
        "b": 213
    },
    {
        "name": "Cambridge blue",
        "hex": "#85B09A",
        "r": 133,
        "g": 176,
        "b": 154
    },
    {
        "name": "Carolina blue",
        "hex": "#7BAFD4",
        "r": 123,
        "g": 175,
        "b": 212
    },
    {
        "name": "Celestial Blue",
        "hex": "#4997D0",
        "r": 73,
        "g": 151,
        "b": 208
    },
    {
        "name": "Celtic Blue",
        "hex": "#246BCE",
        "r": 36,
        "g": 107,
        "b": 206
    },
    {
        "name": "Chefchaouen Blue",
        "hex": "#468FEA",
        "r": 70,
        "g": 143,
        "b": 234
    },
    {
        "name": "Chrysler blue",
        "hex": "#3B00DB",
        "r": 59,
        "g": 0,
        "b": 219
    },
    {
        "name": "Cobalt blue",
        "hex": "#0047AB",
        "r": 0,
        "g": 71,
        "b": 171
    },
    {
        "name": "Columbia blue",
        "hex": "#B9D9EB",
        "r": 185,
        "g": 217,
        "b": 235
    },
    {
        "name": "Cornflower blue",
        "hex": "#6495ED",
        "r": 100,
        "g": 149,
        "b": 237
    },
    {
        "name": "Blue (Crayola)",
        "hex": "#1F75FE",
        "r": 31,
        "g": 117,
        "b": 254
    },
    {
        "name": "Dark blue",
        "hex": "#0000B8",
        "r": 0,
        "g": 0,
        "b": 184
    },
    {
        "name": "Delft Blue",
        "hex": "#1F305E",
        "r": 31,
        "g": 48,
        "b": 94
    },
    {
        "name": "Denim",
        "hex": "#1560BD",
        "r": 21,
        "g": 96,
        "b": 189
    },
    {
        "name": "Dodger blue",
        "hex": "#1E90FF",
        "r": 30,
        "g": 144,
        "b": 255
    },
    {
        "name": "Duke blue",
        "hex": "#00009C",
        "r": 0,
        "g": 0,
        "b": 156
    },
    {
        "name": "Egyptian blue",
        "hex": "#1034A6",
        "r": 16,
        "g": 52,
        "b": 166
    },
    {
        "name": "Federal blue",
        "hex": "#16166B",
        "r": 22,
        "g": 22,
        "b": 107
    },
    {
        "name": "Glaucous",
        "hex": "#6082B6",
        "r": 96,
        "g": 130,
        "b": 182
    },
    {
        "name": "Green Blue",
        "hex": "#1164B4",
        "r": 17,
        "g": 100,
        "b": 180
    },
    {
        "name": "Electric indigo",
        "hex": "#6F00FF",
        "r": 111,
        "g": 0,
        "b": 255
    },
    {
        "name": "French Blue",
        "hex": "#0072BB",
        "r": 0,
        "g": 114,
        "b": 187
    },
    {
        "name": "Indigo",
        "hex": "#4B0082",
        "r": 75,
        "g": 0,
        "b": 130
    },
    {
        "name": "Indigo dye",
        "hex": "#00416A",
        "r": 0,
        "g": 65,
        "b": 106
    },
    {
        "name": "International Klein Blue",
        "hex": "#002FA7",
        "r": 0,
        "g": 47,
        "b": 167
    },
    {
        "name": "Jordy Blue",
        "hex": "#8AB9F1",
        "r": 138,
        "g": 185,
        "b": 241
    },
    {
        "name": "Lapis Lazuli",
        "hex": "#26619C",
        "r": 38,
        "g": 97,
        "b": 156
    },
    {
        "name": "Light blue",
        "hex": "#ADD8E6",
        "r": 173,
        "g": 216,
        "b": 230
    },
    {
        "name": "Light Sky Blue",
        "hex": "#87CEFA",
        "r": 135,
        "g": 206,
        "b": 250
    },
    {
        "name": "Majorelle Blue",
        "hex": "#6050DC",
        "r": 96,
        "g": 80,
        "b": 220
    },
    {
        "name": "Marian blue",
        "hex": "#2B4593",
        "r": 43,
        "g": 69,
        "b": 147
    },
    {
        "name": "Maya blue",
        "hex": "#73C2FB",
        "r": 115,
        "g": 194,
        "b": 251
    },
    {
        "name": "Medium blue",
        "hex": "#0000CD",
        "r": 0,
        "g": 0,
        "b": 205
    },
    {
        "name": "Medium slate blue",
        "hex": "#7B68EE",
        "r": 123,
        "g": 104,
        "b": 238
    },
    {
        "name": "Midnight blue",
        "hex": "#191970",
        "r": 25,
        "g": 25,
        "b": 112
    },
    {
        "name": "Blue (Munsell)",
        "hex": "#0093AF",
        "r": 0,
        "g": 147,
        "b": 175
    },
    {
        "name": "Navy blue",
        "hex": "#000080",
        "r": 0,
        "g": 0,
        "b": 128
    },
    {
        "name": "Blue (NCS)",
        "hex": "#0087BD",
        "r": 0,
        "g": 135,
        "b": 189
    },
    {
        "name": "Neon blue",
        "hex": "#4666FF",
        "r": 70,
        "g": 102,
        "b": 255
    },
    {
        "name": "Non Photo blue",
        "hex": "#A4DDED",
        "r": 164,
        "g": 221,
        "b": 237
    },
    {
        "name": "Oxford Blue",
        "hex": "#002147",
        "r": 0,
        "g": 33,
        "b": 71
    },
    {
        "name": "Palatinate blue",
        "hex": "#273BE2",
        "r": 39,
        "g": 59,
        "b": 226
    },
    {
        "name": "Pale azure",
        "hex": "#87D3F8",
        "r": 135,
        "g": 211,
        "b": 248
    },
    {
        "name": "Penn Blue",
        "hex": "#011F5B",
        "r": 1,
        "g": 31,
        "b": 91
    },
    {
        "name": "Periwinkle",
        "hex": "#CCCCFF",
        "r": 204,
        "g": 204,
        "b": 255
    },
    {
        "name": "Persian blue",
        "hex": "#1C39BB",
        "r": 28,
        "g": 57,
        "b": 187
    },
    {
        "name": "Phthalo blue",
        "hex": "#000F89",
        "r": 0,
        "g": 15,
        "b": 137
    },
    {
        "name": "Picton Blue",
        "hex": "#45B1E8",
        "r": 69,
        "g": 177,
        "b": 232
    },
    {
        "name": "Polynesian blue",
        "hex": "#224C98",
        "r": 34,
        "g": 76,
        "b": 152
    },
    {
        "name": "Powder blue",
        "hex": "#9EB9D4",
        "r": 158,
        "g": 185,
        "b": 212
    },
    {
        "name": "Prussian blue",
        "hex": "#003153",
        "r": 0,
        "g": 49,
        "b": 83
    },
    {
        "name": "Resolution Blue",
        "hex": "#002387",
        "r": 0,
        "g": 35,
        "b": 135
    },
    {
        "name": "RISD Blue",
        "hex": "#2454FF",
        "r": 36,
        "g": 84,
        "b": 255
    },
    {
        "name": "Royal Blue (web color)",
        "hex": "#4169E1",
        "r": 65,
        "g": 105,
        "b": 225
    },
    {
        "name": "Royal blue (traditional)",
        "hex": "#002366",
        "r": 0,
        "g": 35,
        "b": 102
    },
    {
        "name": "Ruddy Blue",
        "hex": "#76ABDF",
        "r": 118,
        "g": 171,
        "b": 223
    },
    {
        "name": "Sapphire",
        "hex": "#0F52BA",
        "r": 15,
        "g": 82,
        "b": 186
    },
    {
        "name": "Honolulu Blue",
        "hex": "#0076B6",
        "r": 0,
        "g": 118,
        "b": 182
    },
    {
        "name": "Savoy blue",
        "hex": "#4B61D1",
        "r": 75,
        "g": 97,
        "b": 209
    },
    {
        "name": "Silver Lake Blue",
        "hex": "#5D89BA",
        "r": 93,
        "g": 137,
        "b": 186
    },
    {
        "name": "Sky blue",
        "hex": "#87CEEB",
        "r": 135,
        "g": 206,
        "b": 235
    },
    {
        "name": "Space cadet",
        "hex": "#1E2952",
        "r": 30,
        "g": 41,
        "b": 82
    },
    {
        "name": "Steel blue",
        "hex": "#4682B4",
        "r": 70,
        "g": 130,
        "b": 180
    },
    {
        "name": "Tang Blue",
        "hex": "#0059CF",
        "r": 0,
        "g": 89,
        "b": 207
    },
    {
        "name": "True Blue",
        "hex": "#2D68C4",
        "r": 45,
        "g": 104,
        "b": 196
    },
    {
        "name": "Tufts Blue",
        "hex": "#3E8EDE",
        "r": 62,
        "g": 142,
        "b": 222
    },
    {
        "name": "UCLA Blue",
        "hex": "#2774AE",
        "r": 39,
        "g": 116,
        "b": 174
    },
    {
        "name": "Ultramarine",
        "hex": "#120A8F",
        "r": 18,
        "g": 10,
        "b": 143
    },
    {
        "name": "United Nations Blue",
        "hex": "#4B92DB",
        "r": 75,
        "g": 146,
        "b": 219
    },
    {
        "name": "Uranian Blue",
        "hex": "#AFDBF5",
        "r": 175,
        "g": 219,
        "b": 245
    },
    {
        "name": "Violet Blue",
        "hex": "#324AB2",
        "r": 50,
        "g": 74,
        "b": 178
    },
    {
        "name": "Vista Blue",
        "hex": "#7C9ED9",
        "r": 124,
        "g": 158,
        "b": 217
    },
    {
        "name": "Yale Blue",
        "hex": "#00356B",
        "r": 0,
        "g": 53,
        "b": 107
    },
    {
        "name": "YInMn Blue",
        "hex": "#2E5090",
        "r": 46,
        "g": 80,
        "b": 144
    },
    {
        "name": "Zaffre",
        "hex": "#0014A8",
        "r": 0,
        "g": 20,
        "b": 168
    },
    {
        "name": "African violet",
        "hex": "#B284BE",
        "r": 178,
        "g": 132,
        "b": 190
    },
    {
        "name": "Amethyst",
        "hex": "#9966CC",
        "r": 153,
        "g": 102,
        "b": 204
    },
    {
        "name": "Blue Violet",
        "hex": "#8A2BE2",
        "r": 138,
        "g": 43,
        "b": 226
    },
    {
        "name": "Byzantium",
        "hex": "#702963",
        "r": 112,
        "g": 41,
        "b": 99
    },
    {
        "name": "Chinese violet",
        "hex": "#856088",
        "r": 133,
        "g": 96,
        "b": 136
    },
    {
        "name": "Dark purple",
        "hex": "#301934",
        "r": 48,
        "g": 25,
        "b": 52
    },
    {
        "name": "Dark violet",
        "hex": "#9400D3",
        "r": 148,
        "g": 0,
        "b": 211
    },
    {
        "name": "Eggplant",
        "hex": "#614051",
        "r": 97,
        "g": 64,
        "b": 81
    },
    {
        "name": "Electric purple",
        "hex": "#BF00FF",
        "r": 191,
        "g": 0,
        "b": 255
    },
    {
        "name": "Electric violet",
        "hex": "#8F00FF",
        "r": 143,
        "g": 0,
        "b": 255
    },
    {
        "name": "English violet",
        "hex": "#563C5C",
        "r": 86,
        "g": 60,
        "b": 92
    },
    {
        "name": "Eminence",
        "hex": "#6C3082",
        "r": 108,
        "g": 48,
        "b": 130
    },
    {
        "name": "Fairy Tale",
        "hex": "#F2C1D1",
        "r": 242,
        "g": 193,
        "b": 209
    },
    {
        "name": "Fandango",
        "hex": "#B53389",
        "r": 181,
        "g": 51,
        "b": 137
    },
    {
        "name": "French mauve",
        "hex": "#D473D4",
        "r": 212,
        "g": 115,
        "b": 212
    },
    {
        "name": "French violet",
        "hex": "#8806CE",
        "r": 136,
        "g": 6,
        "b": 206
    },
    {
        "name": "Fuchsia",
        "hex": "#FF00FF",
        "r": 255,
        "g": 0,
        "b": 255
    },
    {
        "name": "Grape",
        "hex": "#6F2DA8",
        "r": 111,
        "g": 45,
        "b": 168
    },
    {
        "name": "Heliotrope",
        "hex": "#DF73FF",
        "r": 223,
        "g": 115,
        "b": 255
    },
    {
        "name": "Iris",
        "hex": "#5A4FCF",
        "r": 90,
        "g": 79,
        "b": 207
    },
    {
        "name": "Japanese violet",
        "hex": "#5B3256",
        "r": 91,
        "g": 50,
        "b": 86
    },
    {
        "name": "Lavender blush",
        "hex": "#FFF0F5",
        "r": 255,
        "g": 240,
        "b": 245
    },
    {
        "name": "Lavender (floral)",
        "hex": "#B57EDC",
        "r": 181,
        "g": 126,
        "b": 220
    },
    {
        "name": "Lavender (web)",
        "hex": "#E6E6FA",
        "r": 230,
        "g": 230,
        "b": 250
    },
    {
        "name": "Lilac",
        "hex": "#C8A2C8",
        "r": 200,
        "g": 162,
        "b": 200
    },
    {
        "name": "Mardi Gras",
        "hex": "#880085",
        "r": 136,
        "g": 0,
        "b": 133
    },
    {
        "name": "Mauve",
        "hex": "#E0B0FF",
        "r": 224,
        "g": 176,
        "b": 255
    },
    {
        "name": "Mauveine",
        "hex": "#8D029B",
        "r": 141,
        "g": 2,
        "b": 155
    },
    {
        "name": "Mountbatten pink",
        "hex": "#997A8D",
        "r": 153,
        "g": 122,
        "b": 141
    },
    {
        "name": "Mulberry",
        "hex": "#C54B8C",
        "r": 197,
        "g": 75,
        "b": 140
    },
    {
        "name": "Murrey",
        "hex": "#8B004B",
        "r": 139,
        "g": 0,
        "b": 75
    },
    {
        "name": "Orchid",
        "hex": "#DA70D6",
        "r": 218,
        "g": 112,
        "b": 214
    },
    {
        "name": "Palatinate",
        "hex": "#682860",
        "r": 104,
        "g": 40,
        "b": 96
    },
    {
        "name": "Pale purple",
        "hex": "#FAE6FA",
        "r": 250,
        "g": 230,
        "b": 250
    },
    {
        "name": "Persian indigo",
        "hex": "#32127A",
        "r": 50,
        "g": 18,
        "b": 122
    },
    {
        "name": "Phlox",
        "hex": "#DF00FF",
        "r": 223,
        "g": 0,
        "b": 255
    },
    {
        "name": "Pink lavender",
        "hex": "#DBB2D1",
        "r": 219,
        "g": 178,
        "b": 209
    },
    {
        "name": "Plum (web)",
        "hex": "#DDA0DD",
        "r": 221,
        "g": 160,
        "b": 221
    },
    {
        "name": "Pomp and Power",
        "hex": "#86608E",
        "r": 134,
        "g": 96,
        "b": 142
    },
    {
        "name": "Puce",
        "hex": "#CC8899",
        "r": 204,
        "g": 136,
        "b": 153
    },
    {
        "name": "Purple",
        "hex": "#800080",
        "r": 128,
        "g": 0,
        "b": 128
    },
    {
        "name": "Purpureus",
        "hex": "#9A4EAE",
        "r": 154,
        "g": 78,
        "b": 174
    },
    {
        "name": "Rebecca purple",
        "hex": "#663399",
        "r": 102,
        "g": 51,
        "b": 153
    },
    {
        "name": "Royal purple",
        "hex": "#7851A9",
        "r": 120,
        "g": 81,
        "b": 169
    },
    {
        "name": "Red Violet",
        "hex": "#C71585",
        "r": 199,
        "g": 21,
        "b": 133
    },
    {
        "name": "Russian violet",
        "hex": "#32174D",
        "r": 50,
        "g": 23,
        "b": 77
    },
    {
        "name": "Slate blue",
        "hex": "#6A5ACD",
        "r": 106,
        "g": 90,
        "b": 205
    },
    {
        "name": "Steel pink",
        "hex": "#CC33CC",
        "r": 204,
        "g": 51,
        "b": 204
    },
    {
        "name": "Tekhelet",
        "hex": "#512888",
        "r": 81,
        "g": 40,
        "b": 136
    },
    {
        "name": "Thistle",
        "hex": "#D8BFD8",
        "r": 216,
        "g": 191,
        "b": 216
    },
    {
        "name": "Tropical indigo",
        "hex": "#9683EC",
        "r": 150,
        "g": 131,
        "b": 236
    },
    {
        "name": "Tyrian purple",
        "hex": "#66023C",
        "r": 102,
        "g": 2,
        "b": 60
    },
    {
        "name": "Ultra Violet",
        "hex": "#645394",
        "r": 100,
        "g": 83,
        "b": 148
    },
    {
        "name": "Veronica",
        "hex": "#A020F0",
        "r": 160,
        "g": 32,
        "b": 240
    },
    {
        "name": "Violet",
        "hex": "#8000FF",
        "r": 128,
        "g": 0,
        "b": 255
    },
    {
        "name": "Wisteria",
        "hex": "#C9A0DC",
        "r": 201,
        "g": 160,
        "b": 220
    },
    {
        "name": "Amaranth",
        "hex": "#E52B50",
        "r": 229,
        "g": 43,
        "b": 80
    },
    {
        "name": "Baker-Miller Pink",
        "hex": "#FF91AF",
        "r": 255,
        "g": 145,
        "b": 175
    },
    {
        "name": "Dark Magenta",
        "hex": "#8B008B",
        "r": 139,
        "g": 0,
        "b": 139
    },
    {
        "name": "Finn",
        "hex": "#683068",
        "r": 104,
        "g": 48,
        "b": 104
    },
    {
        "name": "Hot magenta",
        "hex": "#FF1DCE",
        "r": 255,
        "g": 29,
        "b": 206
    },
    {
        "name": "Magenta dye",
        "hex": "#CA1F7B",
        "r": 202,
        "g": 31,
        "b": 123
    },
    {
        "name": "Magenta (CMYK)",
        "hex": "#FF0090",
        "r": 255,
        "g": 0,
        "b": 144
    },
    {
        "name": "Magenta (Crayola)",
        "hex": "#F653A6",
        "r": 246,
        "g": 83,
        "b": 166
    },
    {
        "name": "Magenta (Pantone)",
        "hex": "#D0417E",
        "r": 208,
        "g": 65,
        "b": 126
    },
    {
        "name": "Magenta haze",
        "hex": "#9F4576",
        "r": 159,
        "g": 69,
        "b": 118
    },
    {
        "name": "Plum",
        "hex": "#8E4585",
        "r": 142,
        "g": 69,
        "b": 133
    },
    {
        "name": "Purple pizzazz",
        "hex": "#FE4EDA",
        "r": 254,
        "g": 78,
        "b": 218
    },
    {
        "name": "Quinacridone magenta",
        "hex": "#8E3A59",
        "r": 142,
        "g": 58,
        "b": 89
    },
    {
        "name": "Raspberry",
        "hex": "#E30B5C",
        "r": 227,
        "g": 11,
        "b": 92
    },
    {
        "name": "Razzle dazzle rose",
        "hex": "#FF33CC",
        "r": 255,
        "g": 51,
        "b": 204
    },
    {
        "name": "Rose pink",
        "hex": "#FF66CC",
        "r": 255,
        "g": 102,
        "b": 204
    },
    {
        "name": "Rose quartz",
        "hex": "#AA98A9",
        "r": 170,
        "g": 152,
        "b": 169
    },
    {
        "name": "Shocking pink",
        "hex": "#FC0FC0",
        "r": 252,
        "g": 15,
        "b": 192
    },
    {
        "name": "Shocking pink (Crayola)",
        "hex": "#FF6FFF",
        "r": 255,
        "g": 111,
        "b": 255
    },
    {
        "name": "Sky magenta",
        "hex": "#CF71AF",
        "r": 207,
        "g": 113,
        "b": 175
    },
    {
        "name": "Telemagenta",
        "hex": "#CF3476",
        "r": 207,
        "g": 52,
        "b": 118
    },
    {
        "name": "Violet (web color)",
        "hex": "#EE82EE",
        "r": 238,
        "g": 130,
        "b": 238
    },
    {
        "name": "Amaranth pink",
        "hex": "#F19CBB",
        "r": 241,
        "g": 156,
        "b": 187
    },
    {
        "name": "Blush",
        "hex": "#DE5D83",
        "r": 222,
        "g": 93,
        "b": 131
    },
    {
        "name": "Carnation pink",
        "hex": "#FFA6C9",
        "r": 255,
        "g": 166,
        "b": 201
    },
    {
        "name": "Champagne pink",
        "hex": "#F1DDCF",
        "r": 241,
        "g": 221,
        "b": 207
    },
    {
        "name": "Cherry blossom pink",
        "hex": "#FFB7C5",
        "r": 255,
        "g": 183,
        "b": 197
    },
    {
        "name": "China rose",
        "hex": "#A8516E",
        "r": 168,
        "g": 81,
        "b": 110
    },
    {
        "name": "Cyclamen",
        "hex": "#F56FA1",
        "r": 245,
        "g": 111,
        "b": 161
    },
    {
        "name": "Deep pink",
        "hex": "#FF1493",
        "r": 255,
        "g": 20,
        "b": 147
    },
    {
        "name": "Dogwood rose",
        "hex": "#D71868",
        "r": 215,
        "g": 24,
        "b": 104
    },
    {
        "name": "French rose",
        "hex": "#F64A8A",
        "r": 246,
        "g": 74,
        "b": 138
    },
    {
        "name": "Fuchsia rose",
        "hex": "#C74375",
        "r": 199,
        "g": 67,
        "b": 117
    },
    {
        "name": "Hollywood cerise",
        "hex": "#F400A1",
        "r": 244,
        "g": 0,
        "b": 161
    },
    {
        "name": "Hot magenta",
        "hex": "#FF00CC",
        "r": 255,
        "g": 0,
        "b": 204
    },
    {
        "name": "Hot pink",
        "hex": "#FF69B4",
        "r": 255,
        "g": 105,
        "b": 180
    },
    {
        "name": "Lavender pink",
        "hex": "#FBAED2",
        "r": 251,
        "g": 174,
        "b": 210
    },
    {
        "name": "Mexican pink",
        "hex": "#E4007C",
        "r": 228,
        "g": 0,
        "b": 124
    },
    {
        "name": "Mimi Pink",
        "hex": "#FFDAE9",
        "r": 255,
        "g": 218,
        "b": 233
    },
    {
        "name": "Orchid pink",
        "hex": "#F2BDCD",
        "r": 242,
        "g": 189,
        "b": 205
    },
    {
        "name": "Pale Dogwood",
        "hex": "#EDCDC2",
        "r": 237,
        "g": 205,
        "b": 194
    },
    {
        "name": "Peach",
        "hex": "#FFCBA4",
        "r": 255,
        "g": 203,
        "b": 164
    },
    {
        "name": "Persian rose",
        "hex": "#FE28A2",
        "r": 254,
        "g": 40,
        "b": 162
    },
    {
        "name": "Persian pink",
        "hex": "#F77FBE",
        "r": 247,
        "g": 127,
        "b": 190
    },
    {
        "name": "Rose Pompadour",
        "hex": "#ED7A9B",
        "r": 237,
        "g": 122,
        "b": 155
    },
    {
        "name": "Razzmatazz",
        "hex": "#E3256B",
        "r": 227,
        "g": 37,
        "b": 107
    },
    {
        "name": "Raspberry rose",
        "hex": "#B3446C",
        "r": 179,
        "g": 68,
        "b": 108
    },
    {
        "name": "Rose Bonbon",
        "hex": "#F9429E",
        "r": 249,
        "g": 66,
        "b": 158
    },
    {
        "name": "Seashell",
        "hex": "#FFF5EE",
        "r": 255,
        "g": 245,
        "b": 238
    },
    {
        "name": "Tickle me pink",
        "hex": "#FC89AC",
        "r": 252,
        "g": 137,
        "b": 172
    },
    {
        "name": "Thulian pink",
        "hex": "#DE6FA1",
        "r": 222,
        "g": 111,
        "b": 161
    },
    {
        "name": "Alabaster",
        "hex": "#EDEAE0",
        "r": 237,
        "g": 234,
        "b": 224
    },
    {
        "name": "Anti-flash white",
        "hex": "#F2F3F4",
        "r": 242,
        "g": 243,
        "b": 244
    },
    {
        "name": "Antique white",
        "hex": "#FAEBD7",
        "r": 250,
        "g": 235,
        "b": 215
    },
    {
        "name": "Baby powder",
        "hex": "#FEFEFA",
        "r": 254,
        "g": 254,
        "b": 250
    },
    {
        "name": "Cornsilk",
        "hex": "#FFF8DC",
        "r": 255,
        "g": 248,
        "b": 220
    },
    {
        "name": "Dutch white",
        "hex": "#EFDFBB",
        "r": 239,
        "g": 223,
        "b": 187
    },
    {
        "name": "Eggshell",
        "hex": "#F0EAD6",
        "r": 240,
        "g": 234,
        "b": 214
    },
    {
        "name": "Floral white",
        "hex": "#FFFAF0",
        "r": 255,
        "g": 250,
        "b": 240
    },
    {
        "name": "Ghost white",
        "hex": "#F8F8FF",
        "r": 248,
        "g": 248,
        "b": 255
    },
    {
        "name": "Isabelline",
        "hex": "#F4F0EC",
        "r": 244,
        "g": 240,
        "b": 236
    },
    {
        "name": "Linen",
        "hex": "#FAF0E6",
        "r": 250,
        "g": 240,
        "b": 230
    },
    {
        "name": "Magnolia",
        "hex": "#F8F4FF",
        "r": 248,
        "g": 244,
        "b": 255
    },
    {
        "name": "Mint cream",
        "hex": "#F5FFFA",
        "r": 245,
        "g": 255,
        "b": 250
    },
    {
        "name": "Nyanza",
        "hex": "#E9FFDB",
        "r": 233,
        "g": 255,
        "b": 219
    },
    {
        "name": "Old lace",
        "hex": "#FDF5E6",
        "r": 253,
        "g": 245,
        "b": 230
    },
    {
        "name": "Parchment",
        "hex": "#F1E9D2",
        "r": 241,
        "g": 233,
        "b": 210
    },
    {
        "name": "Pearl",
        "hex": "#EAE0C8",
        "r": 234,
        "g": 224,
        "b": 200
    },
    {
        "name": "Platinum",
        "hex": "#E5E4E2",
        "r": 229,
        "g": 228,
        "b": 226
    },
    {
        "name": "Seasalt",
        "hex": "#F7F7F7",
        "r": 247,
        "g": 247,
        "b": 247
    },
    {
        "name": "Snow",
        "hex": "#FFFAFA",
        "r": 255,
        "g": 250,
        "b": 250
    },
    {
        "name": "White",
        "hex": "#FFFFFF",
        "r": 255,
        "g": 255,
        "b": 255
    },
    {
        "name": "White smoke",
        "hex": "#F5F5F5",
        "r": 245,
        "g": 245,
        "b": 245
    },
    {
        "name": "Timberwolf",
        "hex": "#DBD7D2",
        "r": 219,
        "g": 215,
        "b": 210
    },
    {
        "name": "Silver",
        "hex": "#C0C0C0",
        "r": 192,
        "g": 192,
        "b": 192
    },
    {
        "name": "French gray",
        "hex": "#BEBFC5",
        "r": 190,
        "g": 191,
        "b": 197
    },
    {
        "name": "Ash gray",
        "hex": "#B2BEB5",
        "r": 178,
        "g": 190,
        "b": 181
    },
    {
        "name": "Cinereous",
        "hex": "#98817B",
        "r": 152,
        "g": 129,
        "b": 123
    },
    {
        "name": "Cadet gray",
        "hex": "#91A3B0",
        "r": 145,
        "g": 163,
        "b": 176
    },
    {
        "name": "Cool gray",
        "hex": "#8C92AC",
        "r": 140,
        "g": 146,
        "b": 172
    },
    {
        "name": "Taupe gray",
        "hex": "#8B8589",
        "r": 139,
        "g": 133,
        "b": 137
    },
    {
        "name": "Battleship gray",
        "hex": "#848482",
        "r": 132,
        "g": 132,
        "b": 130
    },
    {
        "name": "Gray",
        "hex": "#808080",
        "r": 128,
        "g": 128,
        "b": 128
    },
    {
        "name": "Slate gray",
        "hex": "#708090",
        "r": 112,
        "g": 128,
        "b": 144
    },
    {
        "name": "Dim gray",
        "hex": "#696969",
        "r": 105,
        "g": 105,
        "b": 105
    },
    {
        "name": "Davy's gray",
        "hex": "#555555",
        "r": 85,
        "g": 85,
        "b": 85
    },
    {
        "name": "Payne's gray",
        "hex": "#536878",
        "r": 83,
        "g": 104,
        "b": 120
    },
    {
        "name": "Gunmetal",
        "hex": "#2A3439",
        "r": 42,
        "g": 52,
        "b": 57
    },
    {
        "name": "Feldgrau",
        "hex": "#4D5D53",
        "r": 77,
        "g": 93,
        "b": 83
    },
    {
        "name": "Dark slate gray",
        "hex": "#2F4F4F",
        "r": 47,
        "g": 79,
        "b": 79
    },
    {
        "name": "Black",
        "hex": "#000000",
        "r": 0,
        "g": 0,
        "b": 0
    },
    {
        "name": "Café noir",
        "hex": "#4B3621",
        "r": 75,
        "g": 54,
        "b": 33
    },
    {
        "name": "Charcoal",
        "hex": "#36454F",
        "r": 54,
        "g": 69,
        "b": 79
    },
    {
        "name": "Ebony",
        "hex": "#555D50",
        "r": 85,
        "g": 93,
        "b": 80
    },
    {
        "name": "Eerie black",
        "hex": "#1B1B1B",
        "r": 27,
        "g": 27,
        "b": 27
    },
    {
        "name": "Jet",
        "hex": "#343434",
        "r": 52,
        "g": 52,
        "b": 52
    },
    {
        "name": "Licorice",
        "hex": "#1A1110",
        "r": 26,
        "g": 17,
        "b": 16
    },
    {
        "name": "Night",
        "hex": "#111111",
        "r": 17,
        "g": 17,
        "b": 17
    },
    {
        "name": "Onyx",
        "hex": "#353839",
        "r": 53,
        "g": 56,
        "b": 57
    },
    {
        "name": "Outer space",
        "hex": "#414A4C",
        "r": 65,
        "g": 74,
        "b": 76
    },
    {
        "name": "Raisin black",
        "hex": "#242124",
        "r": 36,
        "g": 33,
        "b": 36
    },
    {
        "name": "Rich black",
        "hex": "#010B13",
        "r": 1,
        "g": 11,
        "b": 19
    },
    {
        "name": "Smoky black",
        "hex": "#100C08",
        "r": 16,
        "g": 12,
        "b": 8
    }
]

interface rgb {
    r: number;
    g: number;
    b: number;
}

function hexToRgb(hex: string) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
        return {r:0, g:0, b:0};
    }

    try {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    } catch (e) {
        return {r:0, g:0, b:0};
    }
}

function getColorDistance(color1: rgb, color2: rgb) {
    const dr = color1.r - color2.r;
    const dg = color1.g - color2.g;
    const db = color1.b - color2.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Default initial state for the results
const defaultResult = {
    name: 'RoyalBlue',
    hex: '#4169E1',
    difference: '39.99',
    inputHex: '#4A90E2',
    inputRgb: { r: 74, g: 144, b: 226 }
};

type ColorPalette = string[];
const generateLCHPalette = (hexColor: string): ColorPalette | undefined => {
    try {
        if (!chroma.valid(hexColor)) return;

        // 1. Input Conversion: Get LCH components of the base color
        const baseColor = chroma(hexColor);
        const [L_base, C_base, H_base] = baseColor.lch();

        // Ensure a minimum chroma for scaling visibility to prevent grey anchors
        const C_scale = Math.max(C_base, 15); // Slightly higher min Chroma

        // 2. Monochromatic Scale Generation (LCH Interpolation)
        // Anchor 1: Very Light (L=95)
        const lightAnchor = chroma.lch(95, C_scale, H_base).hex();
        // Anchor 2: Very Dark (L=10)
        const darkAnchor = chroma.lch(10, C_scale, H_base).hex();

        // Create a continuous scale in LCH mode, mapping Lightness (L) 
        // from 95 (for lightAnchor) to 10 (for darkAnchor).
        const scale = chroma.scale([lightAnchor, darkAnchor])
            .mode('lch')
            .domain([95, 10]); 
        
        // Use the scale function to target specific L values for the shades
        const L300 = scale(80).hex(); // Light Shade (approx L=80)
        const L500 = hexColor;        // Primary Base (Input)
        const L700 = scale(40).hex(); // Dark Shade (approx L=40)
        const L900 = scale(20).hex(); // Darkest Shade (approx L=20)


        // 3. Complementary Accent Calculation
        // H_accent = H_base + 180 (modulo 360)
        const H_accent = (H_base + 180) % 360;
        
        // Maintain the base L and C values for consistent perceived vibrancy
        const accentColor = chroma.lch(L_base, C_base, H_accent).hex();

        // 4. Surface Neutral Calculation
        // Fixed L=95 and C=0 for predictable background contrast.
        const neutralSurface = chroma.lch(95, 0, 0).hex();


        // 5. Assembly
        return [
            L900,           // Color 1: Darkest Shade (Text/High Contrast)
            L700,           // Color 2: Dark Shade (Secondary UI)
            L500,           // Color 3: Primary Base (Interactive Focus)
            L300,           // Color 4: Light Shade (Surface Elevation)
            accentColor,    // Color 5: Accent Complement (CTA/Highlight)
            neutralSurface, // Color 6: Surface Neutral (Background)
        ];

    } catch (e) {
        console.error("Color calculation error:", e);
        return;
    }
};


const Page = () => {
    
    const [pickedColor, setPickedColor] = useState("#4A90E2");
    const [result, setResult] = useState(defaultResult);

    const findClosestColor = useCallback((targetRgb:rgb) => {
        let closestColor = Colors[0];
        let minDistance = Infinity;

        for (const color of Colors) {
            const distance = getColorDistance(targetRgb, color);
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = color;
            }
        }

        return {
            ...closestColor,
            difference: minDistance.toFixed(2)
        };
    }, []);

    const handleSearch = useCallback((hexValue:string) => {
        console.log("Picked color: " + pickedColor);
        
        const hexInput = hexValue.trim();
        setPickedColor(hexInput);

        const inputRgb = hexToRgb(hexInput);
        const formattedHex = '#' + hexInput.replace(/^#/, '').toUpperCase();

        const closest = findClosestColor(inputRgb);
        
        // FIX: Explicitly construct the inputRgb object to help TypeScript narrow the type
        // and avoid the union type assignment error.
        setResult({
            name: closest.name,
            hex: closest.hex,
            difference: closest.difference,
            inputHex: formattedHex,
            inputRgb: {
                r: inputRgb.r,
                g: inputRgb.g,
                b: inputRgb.b
            }
        });
    }, [findClosestColor]);

    useEffect(()=>{
        handleSearch(pickedColor);
    },[pickedColor])

    const [file, setFile] = useState<File|null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }

        // Creates a temporary, local URL for the file (a blob)
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // This is the cleanup function: it is called when the component unmounts
        // or when the 'file' dependency changes, preventing a memory leak.
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        } else {
            setFile(null);
        }
    };

    // Palate Maker
    const [palette, setPalette] = useState<string[]>();

    const getContrastTextColor = useCallback((index: number) => {
        // 1. Check for valid palette and index
        if (!palette || index < 0 || index >= palette.length) return '#000000';

        const colorHex = palette[index];

        // 2. Use chroma.js to determine the best contrast color (Black or White)
        // The contrast() method automatically checks the contrast ratio against black and white
        // and returns the one with the higher contrast.
        const contrastColor = chroma.contrast(colorHex, 'white') > 4.5 
            ? '#FFFFFF' // Use white if contrast is good
            : chroma.contrast(colorHex, 'black') > 4.5
            ? '#000000' // Use black if contrast is good (4.5 is the WCAG AA minimum)
            : chroma(colorHex).luminance() > 0.5 // Fallback based on simple luminance (lighter than 50%)
            ? '#000000'
            : '#FFFFFF';

        return contrastColor;
    }, [palette]);
    
    // Use useCallback to memoize the generation logic
    const updatePalette = (hex:string) => {
        const newPalette = generateLCHPalette(hex);
        setPalette(newPalette);
    }

    useEffect(() => {
        updatePalette(pickedColor);
    }, [pickedColor, updatePalette]);
    
    const openEyeDropper = async () => {
        if (!window.EyeDropper) {
        alert("EyeDropper API is not supported in this browser.");
        return;
        }

        const eyeDropper = new EyeDropper();
        
        try {
        const result = await eyeDropper.open();
        // 2. Update the color state with the value from the EyeDropper
        setPickedColor(result.sRGBHex); 
        } catch (e) {
            console.log('EyeDropper cancelled.');
        }
    };

    return (
        <div className="px-base text-center pt-20 pb-8 w-full px-4">
            <h1>Color Picker</h1>
            <p>Pick Your Favorite Color, Know It's Name & Generate a Color Palate</p>
            <div className="divider divider-base w-full"></div>
            <div className="flex flex-col md:flex-row gap-8 items-center w-full justify-center my-4">
                <div className="w-full md:w-1/2 bg-base-300 p-4">
                    <p>Upload an Image to Pick a Color from it.</p>
                    <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} className="file-input file-input-primary my-4" />
                    <div className="imagePreview text-center">
                        <img 
                            src={previewUrl} 
                            alt="Image Preview"
                            className="w-auto"
                        />
                    </div>
                    <button onClick={openEyeDropper} className="btn btn-secondary mt-4">
                        👁️ Pick Color from Screen
                    </button>
                </div>
                <div className="p-4 w-full md:w-1/2 flex gap-4 items-center flex-col sm:flex-row">
                    <div className="text-black">
                        <SketchPicker color={pickedColor} onChange={(color:any) => handleSearch(color.hex)} />
                    </div>
                    <div className="grow flex flex-col items-center justify-center">
                        <div className="bg-base-300 w-full p-4">
                            <h4 className="bold text-xl mb-2">Input Color:</h4>
                            <div className="w-full flex items-center gap-4">
                                <div className="aspect-square w-1/3" style={{ backgroundColor: result.inputHex }}></div>
                                <div>
                                    <p>{result.inputHex}</p>
                                    <p>{"rgb(" + result.inputRgb.r}, {result.inputRgb.g}, {result.inputRgb.b + ")"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-base-300 mt-3 w-full p-4">
                            <h4 className="bold text-xl">Closest Color Name</h4>
                            <p className="badge badge-success py-5 px-5 font-bold text-xl my-2">{result.name}</p>
                            <p>{"("+result.hex+")"}</p>
                        </div>
                        {/* <button type="button" className="btn btn-primary mt-4">Generate Color Palette</button> */}
                    </div>
                </div>
            </div>
            <div className="divider divider-base w-full"></div>
            <h2>LCH Palette (Functional Roles)</h2>
            <div className="grid grid-cols-2 gap-4 rounded-2xl p-4 my-4 md:grid-cols-3">
                {palette && palette.map((color:string, index:number) => (
                    <div key={index} className="min-h-16 flex flex-col items-center justify-center p-4" style={{backgroundColor: color,color: getContrastTextColor(index)}}>
                        <b>Color {index + 1}</b>
                        <p>{
                            index == 0 ? "Darkest Shade (Text/High Contrast)" : index == 1 ? "Dark Shade (Secondary UI)" : index == 2 ? "Primary Base (Interactive Focus)" : index == 3 ? "Light Shade (Surface Elevation)" : index == 4 ? "Accent Complement (CTA/Highlight)" : "Surface Neutral (Background)"
                        }</p>
                        {color.toUpperCase()}
                    </div>
                ))}
            </div>
            <div className="divider w-full divider-base"></div>
            <ColorPaletteGenerator color={pickedColor} />
        </div>
    )
}

export default Page;