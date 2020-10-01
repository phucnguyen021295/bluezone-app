/*
 * @Project Bluezone
 * @Author Bluezone Global (contact@bluezone.ai)
 * @Createdate 04/26/2020, 16:36
 *
 * This file is part of Bluezone (https://bluezone.ai)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

import radarWrapper from './radarWrapper';

export default Object.assign({}, radarWrapper, {
    layers: [
        {
            ddd: 0,
            ind: 4,
            ty: 4,
            nm: 'Scanning',
            sr: 1,
            ks: {
                o: {
                    a: 0,
                    k: 100,
                    ix: 11,
                },
                r: {
                    a: 1,
                    k: [
                        {
                            i: {
                                x: [0.833],
                                y: [0.833],
                            },
                            o: {
                                x: [0.167],
                                y: [0.167],
                            },
                            t: 0,
                            s: [-60],
                        },
                        {
                            t: 60,
                            s: [300],
                        },
                    ],
                    ix: 10,
                },
                p: {
                    a: 0,
                    k: [360, 360, 0],
                    ix: 2,
                },
                a: {
                    a: 0,
                    k: [372.522, 53.199, 0],
                    ix: 1,
                },
                s: {
                    a: 1,
                    k: [
                        {
                            i: {
                                x: [0.833, 0.833, 0.833],
                                y: [0.833, 0.833, 0.833],
                            },
                            o: {
                                x: [0.167, 0.167, 0.167],
                                y: [0.167, 0.167, 0.167],
                            },
                            t: 39,
                            s: [100, 100, 100],
                        },
                        {
                            t: 53.0000021587343,
                            s: [99, 99, 100],
                        },
                    ],
                    ix: 6,
                },
            },
            ao: 0,
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            ind: 0,
                            ty: 'sh',
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [0, 0], [-108.797, -15.77]],
                                    o: [[0, 0], [43.637, 72.625], [0, 0]],
                                    v: [
                                        [144.442, -182.968],
                                        [-118.553, -24.945],
                                        [106.778, 121.962],
                                    ],
                                    c: true,
                                },
                                ix: 2,
                            },
                            nm: 'Path 1',
                            mn: 'ADBE Vector Shape - Group',
                            hd: false,
                        },
                        {
                            ty: 'mm',
                            mm: 4,
                            nm: 'Merge Paths 1',
                            mn: 'ADBE Vector Filter - Merge',
                            hd: false,
                        },
                        {
                            ty: 'gf',
                            o: {
                                a: 0,
                                k: 100,
                                ix: 10,
                            },
                            r: 1,
                            bm: 0,
                            g: {
                                p: 3,
                                k: {
                                    a: 0,
                                    k: [
                                        0,
                                        0.004,
                                        0.361,
                                        0.816,
                                        0.458,
                                        0.002,
                                        0.27,
                                        0.612,
                                        1,
                                        0,
                                        0.179,
                                        0.408,
                                        0,
                                        0,
                                        0.5,
                                        0.175,
                                        1,
                                        0.35,
                                    ],
                                    ix: 9,
                                },
                            },
                            s: {
                                a: 0,
                                k: [211.347, 94.113],
                                ix: 5,
                            },
                            e: {
                                a: 0,
                                k: [7.755, -105.237],
                                ix: 6,
                            },
                            t: 1,
                            nm: 'Gradient Fill 1',
                            mn: 'ADBE Vector Graphic - G-Fill',
                            hd: false,
                        },
                        {
                            ty: 'tr',
                            p: {
                                a: 0,
                                k: [228.044, 236.193],
                                ix: 2,
                            },
                            a: {
                                a: 0,
                                k: [0, 0],
                                ix: 1,
                            },
                            s: {
                                a: 0,
                                k: [100, 100],
                                ix: 3,
                            },
                            r: {
                                a: 0,
                                k: 0,
                                ix: 6,
                            },
                            o: {
                                a: 0,
                                k: 100,
                                ix: 7,
                            },
                            sk: {
                                a: 0,
                                k: 0,
                                ix: 4,
                            },
                            sa: {
                                a: 0,
                                k: 0,
                                ix: 5,
                            },
                            nm: 'Transform',
                        },
                    ],
                    nm: 'Group 3',
                    np: 3,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: 'ADBE Vector Group',
                    hd: false,
                },
            ],
            ip: 0,
            op: 60.0000024438501,
            st: -5.00000020365417,
            bm: 0,
        },
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: 'Center radar',
            sr: 1,
            ks: {
                o: {
                    a: 0,
                    k: 100,
                    ix: 11,
                },
                r: {
                    a: 0,
                    k: 0,
                    ix: 10,
                },
                p: {
                    a: 0,
                    k: [360, 350, 0],
                    ix: 2,
                },
                a: {
                    a: 0,
                    k: [0, 0, 0],
                    ix: 1,
                },
                s: {
                    a: 0,
                    k: [19, 19, 100],
                    ix: 6,
                },
            },
            ao: 0,
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            d: 1,
                            ty: 'el',
                            s: {
                                a: 0,
                                k: [344, 344],
                                ix: 2,
                            },
                            p: {
                                a: 0,
                                k: [0, 0],
                                ix: 3,
                            },
                            nm: 'Ellipse Path 1',
                            mn: 'ADBE Vector Shape - Ellipse',
                            hd: false,
                        },
                        {
                            ty: 'st',
                            c: {
                                a: 0,
                                k: [0, 0.372548989689, 0.843137015548, 1],
                                ix: 3,
                            },
                            o: {
                                a: 0,
                                k: 100,
                                ix: 4,
                            },
                            w: {
                                a: 0,
                                k: 0,
                                ix: 5,
                            },
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: 'Stroke 1',
                            mn: 'ADBE Vector Graphic - Stroke',
                            hd: false,
                        },
                        {
                            ty: 'fl',
                            c: {
                                a: 0,
                                k: [1, 1, 1, 1],
                                ix: 4,
                            },
                            o: {
                                a: 0,
                                k: 100,
                                ix: 5,
                            },
                            r: 1,
                            bm: 0,
                            nm: 'Fill 1',
                            mn: 'ADBE Vector Graphic - Fill',
                            hd: false,
                        },
                        {
                            ty: 'tr',
                            p: {
                                a: 0,
                                k: [-12, 38],
                                ix: 2,
                            },
                            a: {
                                a: 0,
                                k: [0, 0],
                                ix: 1,
                            },
                            s: {
                                a: 0,
                                k: [100, 100],
                                ix: 3,
                            },
                            r: {
                                a: 0,
                                k: 0,
                                ix: 6,
                            },
                            o: {
                                a: 0,
                                k: 100,
                                ix: 7,
                            },
                            sk: {
                                a: 0,
                                k: 0,
                                ix: 4,
                            },
                            sa: {
                                a: 0,
                                k: 0,
                                ix: 5,
                            },
                            nm: 'Transform',
                        },
                    ],
                    nm: 'Ellipse 1',
                    np: 3,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: 'ADBE Vector Group',
                    hd: false,
                },
            ],
            ip: 0,
            op: 60.0000024438501,
            st: 0,
            bm: 0,
        },
    ],
});
