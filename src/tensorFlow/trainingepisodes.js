let yourMom = [
  [0, -1, -1, 0.511, 0.21428571428571427],
  [0, -1, -2, 0.511, 0.21428571428571427],
  [0, -1, -3, 0.5568000000000001, 0.21428571428571427],
  [0, 1, -2, 0.6348, 0.21428571428571427],
  [0, 1, -1, 0.6522, 0.21428571428571427],
  [0, 1, 0, 0.703, 0.21428571428571427],
  [0, 1, 1, 0.7445999999999998, 0.21428571428571427],
  [0, 1, 2, 0.7883999999999999, 0.21428571428571427],
  [3, 1, 3, 0.8, 0.17446428571428588],
  [3, 1, 4, 0.8, 0.134107142857143],
  [0, 1, 5, 0.8188, 0.10714285714285714],
  [0, 1, 6, 0.861, 0.10714285714285714],
  [0, 1, 7, 0.9035999999999998, 0.10714285714285714],
  [0, 1, 8, 0.9469999999999997, 0.10714285714285714],
  [3, 1, 9, 1, 0.10500000000000013],
  [3, 1, 10, 1, 0.06357142857142871],
  [3, 1, 11, 1, 0.02732142857142871],
  [2, 1, 12, 0.9748000000000002, 0],
  [2, 1, 13, 0.9352000000000003, 0],
  [2, 1, 14, 0.8928000000000001, 0],
  [2, 1, 15, 0.8434000000000001, 0],
  [2, 1, 16, 0.7972000000000002, 0],
  [2, 1, 17, 0.7584000000000003, 0],
  [2, 1, 18, 0.7162000000000003, 0],
  [2, 1, 19, 0.6700000000000004, 0],
  [2, 1, 20, 0.6228000000000005, 0],
  [2, 1, 21, 0.5854000000000005, 0],
  [1, 1, 22, 0.56, 0.026071428571428135],
  [1, 1, 23, 0.56, 0.06892857142857099],
  [0, 1, 24, 0.5673999999999996, 0.10714285714285714],
  [0, 1, 25, 0.6075999999999996, 0.10714285714285714],
  [0, 1, 26, 0.6535999999999994, 0.10714285714285714],
  [1, 1, 27, 0.68, 0.12821428571428523],
  [1, 1, 28, 0.68, 0.1687499999999995],
  [2, 1, 29, 0.6784000000000006, 0.21428571428571427],
  [2, -1, 28, 0.6372000000000007, 0.21428571428571427],
  [2, -1, 27, 0.5918000000000008, 0.21428571428571427],
  [1, -1, 26, 0.56, 0.23142857142857068],
  [1, 1, 27, 0.56, 0.2728571428571421],
  [1, 1, 28, 0.56, 0.30678571428571344],
  [0, 1, 29, 0.6041999999999991, 0.32142857142857145],
  [0, 1, 30, 0.6425999999999991, 0.32142857142857145],
  [0, 1, 31, 0.6899999999999992, 0.32142857142857145],
  [0, 1, 32, 0.7369999999999993, 0.32142857142857145],
  [0, 1, 33, 0.7743999999999993, 0.32142857142857145],
  [3, 1, 34, 0.8, 0.29357142857142937],
  [3, 1, 35, 0.8, 0.2533928571428579],
  [1, 1, 36, 0.8, 0.28000000000000075],
  [0, -1, 35, 0.8066000000000009, 0.32142857142857145],
  [0, 1, 36, 0.8510000000000008, 0.32142857142857145],
  [0, 1, 37, 0.8936000000000008, 0.32142857142857145],
  [0, 1, 38, 0.9324000000000008, 0.32142857142857145],
  [0, 1, 39, 0.9800000000000008, 0.32142857142857145],
  [3, 1, 40, 1, 0.2942857142857149],
  [3, 1, 41, 1, 0.2560714285714292],
  [2, 1, 42, 0.9962000000000008, 0.21428571428571427],
  [2, 1, 43, 0.9512000000000007, 0.21428571428571427],
  [2, 1, 44, 0.92, 0.21428571428571427],
  [3, -1, 43, 0.92, 0.18160714285714283],
  [3, 1, 44, 0.92, 0.1441071428571428],
  [3, 1, 45, 0.92, 0.10714285714285714]
];

const eps = {
  episode1: [
    [0, -1, -1],
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 1, 5],
    [1, 1, 6],
    [1, -1, 5],
    [1, 1, 6],
    [1, 1, 7],
    [1, 1, 8],
    [1, 1, 9],
    [1, 1, 10],
    [1, 1, 11],
    [1, 1, 12],
    [1, 1, 13],
    [1, 1, 14],
    [1, 1, 15],
    [1, 1, 16],
    [1, 1, 17],
    [1, 1, 18],
    [1, 1, 19],
    [1, 1, 20],
    [1, 1, 21],
    [1, 1, 22],
    [1, 1, 23],
    [1, 1, 24],
    [1, 1, 25],
    [1, 1, 26],
    [1, 1, 27],
    [1, 1, 28],
    [1, 1, 29],
    [1, 1, 30],
    [1, 1, 31],
    [1, 1, 32],
    [1, 1, 33],
    [1, 1, 34],
    [1, 1, 35],
    [1, 1, 36],
    [1, 1, 37],
    [1, -1, 36],
    [1, -1, 35],
    [1, -1, 34],
    [1, -1, 33],
    [1, -1, 32],
    [1, -1, 31],
    [1, -1, 30],
    [1, 1, 31],
    [1, 1, 32],
    [1, 1, 33],
    [1, 1, 34],
    [1, 1, 35],
    [1, 1, 36],
    [1, 1, 37],
    [1, 1, 38],
    [1, 1, 39],
    [1, 1, 40],
    [1, 1, 41],
    [1, 1, 42],
    [1, 1, 43],
    [1, 1, 44],
    [1, 1, 45],
    [1, 1, 46],
    [1, 1, 47],
    [1, 1, 48],
    [1, 1, 49],
    [1, 1, 50],
    [1, 1, 51],
    [1, 1, 52],
    [1, 1, 53],
    [1, 1, 54],
    [1, -1, 53],
    [1, 1, 54],
    [1, 1, 55],
    [1, 1, 56],
    [1, 1, 57],
    [1, 1, 58],
    [1, 1, 59],
    [1, 1, 60],
    [1, 1, 61],
    [1, -1, 60],
    [1, -1, 59],
    [1, -1, 58],
    [1, -1, 57],
    [1, -1, 56],
    [1, -1, 55],
    [1, -1, 54],
    [1, -1, 53],
    [1, -1, 52],
    [1, 1, 53],
    [1, 1, 54],
    [1, 1, 55],
    [1, 1, 56],
    [1, 1, 57],
    [1, 1, 58],
    [1, 1, 59],
    [1, 1, 60],
    [1, 1, 61],
    [1, 1, 62],
    [1, 1, 63],
    [1, -1, 62],
    [1, -1, 61],
    [1, -1, 60],
    [1, 1, 61],
    [1, 1, 62],
    [1, 1, 63],
    [1, 1, 64],
    [1, -1, 63],
    [1, -1, 62],
    [1, 1, 63],
    [1, 1, 64],
    [1, 1, 65],
    [1, 1, 66],
    [1, 1, 67],
    [1, 1, 68],
    [1, 1, 69],
    [1, 1, 70],
    [1, 1, 71],
    [1, 1, 72],
    [1, 1, 73],
    [1, 1, 74],
    [1, -1, 73],
    [1, 1, 74],
    [1, -1, 73],
    [1, -1, 72],
    [1, -1, 71],
    [1, -1, 70],
    [1, -1, 69],
    [1, 1, 70],
    [1, 1, 71],
    [1, 1, 72],
    [1, 1, 73],
    [1, 1, 74],
    [1, 1, 75],
    [1, 1, 76],
    [1, -1, 75],
    [1, -1, 74],
    [1, -1, 73],
    [1, -1, 72],
    [1, -1, 71],
    [1, -1, 70],
    [1, 1, 71],
    [1, -1, 70],
    [1, -1, 69],
    [1, -1, 68],
    [1, -1, 67],
    [1, -1, 66],
    [1, -1, 65],
    [1, -1, 64],
    [1, -1, 63],
    [1, -1, 62],
    [1, -1, 61],
    [1, -1, 60],
    [1, -1, 59],
    [1, -1, 58],
    [1, -1, 57],
    [1, -1, 56],
    [1, -1, 55],
    [1, 1, 56],
    [1, 1, 57],
    [1, 1, 58],
    [1, 1, 59],
    [1, 1, 60],
    [1, 1, 61],
    [1, 1, 62],
    [1, 1, 63],
    [1, 1, 64],
    [1, 1, 65],
    [1, 1, 66],
    [1, 1, 67],
    [1, 1, 68],
    [1, -1, 67],
    [1, 1, 68],
    [1, 1, 69],
    [1, 1, 70],
    [1, 1, 71],
    [1, 1, 72],
    [1, 1, 73],
    [1, 1, 74],
    [1, 1, 75],
    [1, 1, 76],
    [1, 1, 77],
    [1, 1, 78],
    [1, 1, 79],
    [1, 1, 80],
    [1, 1, 81],
    [1, 1, 82],
    [1, 1, 83],
    [1, 1, 84],
    [1, 1, 85],
    [1, 1, 86],
    [1, 1, 87],
    [1, -1, 86],
    [1, -1, 85],
    [1, -1, 84],
    [1, 1, 85],
    [1, 1, 86],
    [1, 1, 87],
    [1, 1, 88],
    [1, 1, 89],
    [1, 1, 90],
    [1, 1, 91],
    [1, -1, 90],
    [1, -1, 89],
    [1, -1, 88],
    [1, 1, 89],
    [1, 1, 90],
    [1, 1, 91],
    [1, 1, 92],
    [1, 1, 93],
    [1, -1, 92],
    [1, -1, 91],
    [1, -1, 90],
    [1, -1, 89],
    [1, -1, 88],
    [1, -1, 87],
    [1, -1, 86],
    [1, -1, 85],
    [1, -1, 84],
    [1, -1, 83],
    [1, -1, 82],
    [1, 1, 83],
    [1, 1, 84],
    [1, 1, 85],
    [1, 1, 86],
    [1, 1, 87],
    [1, 1, 88],
    [1, 1, 89],
    [1, 1, 90],
    [1, 1, 91],
    [1, 1, 92],
    [1, 1, 93],
    [1, 1, 94],
    [1, 1, 95],
    [1, 1, 96],
    [1, 1, 97],
    [1, 1, 98],
    [1, -1, 97],
    [1, -1, 96],
    [1, -1, 95],
    [1, -1, 94],
    [1, -1, 93],
    [1, -1, 92],
    [1, 1, 93],
    [1, 1, 94],
    [1, 1, 95],
    [1, 1, 96],
    [1, 1, 97],
    [1, 1, 98],
    [1, 1, 99],
    [1, 1, 100],
    [1, 1, 101],
    [1, 1, 102],
    [1, -1, 101],
    [1, -1, 100],
    [1, -1, 99],
    [1, 1, 100],
    [1, 1, 101],
    [1, 1, 102],
    [1, 1, 103],
    [1, 1, 104],
    [1, 1, 105],
    [1, 1, 106],
    [1, 1, 107],
    [1, 1, 108],
    [1, 1, 109],
    [1, 1, 110],
    [1, 1, 111],
    [1, 1, 112],
    [1, 1, 113],
    [1, 1, 114],
    [1, 1, 115],
    [1, 1, 116],
    [1, -1, 115],
    [1, -1, 114],
    [1, 1, 115],
    [1, -1, 114],
    [1, -1, 113],
    [1, -1, 112],
    [1, 1, 113],
    [1, -1, 112],
    [1, -1, 111],
    [1, -1, 110],
    [1, -1, 109],
    [1, -1, 108],
    [1, 1, 109],
    [1, 1, 110],
    [1, 1, 111],
    [1, 1, 112],
    [1, 1, 113],
    [1, 1, 114],
    [1, 1, 115],
    [1, 1, 116],
    [1, 1, 117],
    [1, 1, 118],
    [1, 1, 119],
    [1, -1, 118],
    [1, 1, 119],
    [1, 1, 120],
    [1, 1, 121],
    [1, 1, 122],
    [1, 1, 123],
    [1, 1, 124],
    [1, 1, 125],
    [1, 1, 126],
    [1, 1, 127],
    [1, 1, 128]
  ],
  episode2: [
    [0, -1, -1],
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [3, 1, 5],
    [3, 1, 6],
    [3, 1, 7],
    [3, 1, 8],
    [3, 1, 9],
    [3, 1, 10],
    [3, 1, 11],
    [3, 1, 12],
    [3, 1, 13],
    [3, 1, 14],
    [3, 1, 15],
    [3, 1, 16],
    [3, 1, 17],
    [3, 1, 18],
    [3, 1, 19],
    [3, 1, 20],
    [3, 1, 21],
    [3, 1, 22],
    [3, 1, 23],
    [3, 1, 24],
    [3, 1, 25],
    [3, 1, 26],
    [3, 1, 27],
    [3, 1, 28],
    [3, 1, 29],
    [3, 1, 30],
    [3, 1, 31],
    [3, 1, 32],
    [3, 1, 33],
    [3, 1, 34],
    [3, 1, 35],
    [3, 1, 36],
    [3, 1, 37],
    [3, 1, 38],
    [3, 1, 39],
    [3, 1, 40],
    [3, 1, 41],
    [3, 1, 42],
    [3, 1, 43],
    [3, 1, 44],
    [3, 1, 45],
    [3, 1, 46],
    [3, 1, 47],
    [3, 1, 48],
    [3, 1, 49],
    [3, 1, 50],
    [3, 1, 51],
    [3, 1, 52],
    [3, 1, 53],
    [3, 1, 54],
    [3, 1, 55],
    [3, 1, 56],
    [3, 1, 57],
    [3, 1, 58],
    [3, 1, 59],
    [3, 1, 60],
    [3, 1, 61],
    [3, 1, 62],
    [3, -1, 61],
    [3, -1, 60],
    [3, -1, 59],
    [3, -1, 58],
    [3, -1, 57],
    [3, -1, 56],
    [3, -1, 55],
    [3, -1, 54],
    [3, 1, 55],
    [3, 1, 56],
    [3, 1, 57],
    [3, 1, 58],
    [3, 1, 59],
    [3, 1, 60],
    [3, 1, 61],
    [3, 1, 62],
    [3, 1, 63],
    [3, 1, 64],
    [3, 1, 65],
    [3, 1, 66],
    [3, 1, 67],
    [3, 1, 68],
    [3, 1, 69],
    [3, 1, 70],
    [3, 1, 71],
    [3, 1, 72],
    [3, 1, 73],
    [3, 1, 74],
    [3, 1, 75],
    [3, 1, 76],
    [3, 1, 77],
    [3, 1, 78],
    [3, 1, 79],
    [3, 1, 80],
    [3, 1, 81],
    [3, 1, 82],
    [3, 1, 83],
    [3, 1, 84],
    [3, 1, 85],
    [3, -1, 84],
    [3, 1, 85],
    [3, 1, 86],
    [3, 1, 87],
    [3, 1, 88],
    [3, 1, 89],
    [3, 1, 90],
    [3, 1, 91],
    [3, 1, 92],
    [3, 1, 93],
    [3, 1, 94],
    [3, 1, 95],
    [3, -1, 94],
    [3, -1, 93],
    [3, -1, 92],
    [3, -1, 91],
    [3, -1, 90],
    [3, -1, 89],
    [3, -1, 88],
    [3, 1, 89],
    [3, 1, 90],
    [3, 1, 91],
    [3, 1, 92],
    [3, 1, 93],
    [3, 1, 94],
    [3, -1, 93],
    [3, -1, 92],
    [3, -1, 91],
    [3, -1, 90],
    [3, -1, 89],
    [3, -1, 88],
    [3, -1, 87],
    [3, -1, 86],
    [3, 1, 87],
    [3, 1, 88],
    [3, 1, 89],
    [3, 1, 90],
    [3, 1, 91],
    [3, -1, 90],
    [3, -1, 89],
    [3, -1, 88],
    [3, -1, 87],
    [3, -1, 86],
    [3, -1, 85],
    [3, -1, 84],
    [3, 1, 85],
    [3, 1, 86],
    [3, 1, 87],
    [3, 1, 88],
    [3, 1, 89],
    [3, 1, 90],
    [3, 1, 91],
    [3, 1, 92],
    [3, 1, 93],
    [3, 1, 94],
    [3, 1, 95],
    [3, -1, 94],
    [3, -1, 93],
    [3, 1, 94],
    [3, -1, 93],
    [3, 1, 94],
    [3, 1, 95],
    [3, 1, 96],
    [3, 1, 97],
    [3, 1, 98],
    [3, 1, 99],
    [3, 1, 100],
    [3, 1, 101],
    [3, 1, 102],
    [3, 1, 103],
    [3, 1, 104],
    [3, 1, 105],
    [3, -1, 104],
    [3, -1, 103],
    [3, 1, 104],
    [3, 1, 105],
    [3, 1, 106],
    [3, 1, 107],
    [3, 1, 108],
    [3, 1, 109],
    [3, 1, 110],
    [3, 1, 111],
    [3, 1, 112],
    [3, 1, 113],
    [3, 1, 114],
    [3, 1, 115],
    [3, -1, 114],
    [3, -1, 113],
    [3, -1, 112],
    [3, -1, 111],
    [3, -1, 110],
    [3, -1, 109],
    [3, -1, 108],
    [3, -1, 107],
    [3, -1, 106],
    [3, 1, 107],
    [3, 1, 108],
    [3, 1, 109],
    [3, 1, 110],
    [3, 1, 111],
    [3, 1, 112],
    [3, 1, 113],
    [3, 1, 114],
    [3, -1, 113],
    [3, -1, 112],
    [3, -1, 111],
    [3, 1, 112],
    [3, 1, 113],
    [3, 1, 114],
    [3, 1, 115],
    [3, 1, 116],
    [3, 1, 117],
    [3, 1, 118],
    [3, 1, 119],
    [3, 1, 120],
    [3, 1, 121],
    [3, 1, 122],
    [3, 1, 123],
    [3, -1, 122],
    [3, -1, 121],
    [3, -1, 120],
    [3, -1, 119],
    [3, -1, 118],
    [3, -1, 117],
    [3, 1, 118],
    [3, 1, 119],
    [3, 1, 120],
    [3, 1, 121],
    [3, 1, 122],
    [3, 1, 123],
    [3, 1, 124],
    [3, 1, 125],
    [3, 1, 126],
    [3, 1, 127],
    [3, -1, 126],
    [3, 1, 127],
    [3, 1, 128],
    [3, 1, 129],
    [3, 1, 130],
    [3, 1, 131],
    [3, 1, 132],
    [3, 1, 133],
    [3, 1, 134],
    [3, -1, 133],
    [3, -1, 132],
    [3, -1, 131],
    [3, 1, 132],
    [3, 1, 133],
    [3, 1, 134],
    [3, 1, 135],
    [3, 1, 136],
    [3, 1, 137],
    [3, 1, 138],
    [3, 1, 139],
    [3, -1, 138],
    [3, -1, 137],
    [3, -1, 136],
    [3, 1, 137],
    [3, 1, 138],
    [3, 1, 139],
    [3, 1, 140],
    [3, 1, 141],
    [3, -1, 140],
    [3, -1, 139],
    [3, -1, 138],
    [3, -1, 137],
    [3, -1, 136],
    [3, -1, 135],
    [3, 1, 136],
    [3, 1, 137],
    [3, 1, 138],
    [3, 1, 139],
    [3, 1, 140],
    [3, 1, 141],
    [3, 1, 142],
    [3, -1, 141],
    [3, -1, 140],
    [3, -1, 139],
    [3, 1, 140],
    [3, 1, 141],
    [3, 1, 142],
    [3, 1, 143],
    [3, 1, 144],
    [3, 1, 145],
    [3, 1, 146],
    [3, 1, 147]
  ],
  episode3: [
    [0, -1, -1, 0.518, 0.21428571428571427],
    [0, 1, 0, 0.564, 0.21428571428571427],
    [0, 1, 1, 0.6148, 0.21428571428571427],
    [0, 1, 2, 0.6612, 0.21428571428571427],
    [0, 1, 3, 0.698, 0.21428571428571427],
    [0, 1, 4, 0.7486000000000002, 0.21428571428571427],
    [0, 1, 5, 0.7878000000000002, 0.21428571428571427],
    [1, 1, 6, 0.8, 0.2521428571428573],
    [1, 1, 7, 0.8, 0.29428571428571443],
    [1, 1, 8, 0.7859999999999998, 0.32142857142857145],
    [1, 1, 9, 0.736, 0.32142857142857145],
    [1, 1, 10, 0.6961999999999999, 0.32142857142857145],
    [1, 1, 11, 0.6531999999999999, 0.32142857142857145],
    [1, 1, 12, 0.6064, 0.32142857142857145],
    [1, 1, 13, 0.56, 0.3135714285714286],
    [1, 1, 14, 0.56, 0.27607142857142863],
    [1, 1, 15, 0.56, 0.23803571428571432],
    [1, -1, 14, 0.5888, 0.21428571428571427],
    [1, -1, 13, 0.6306, 0.21428571428571427],
    [1, -1, 12, 0.68, 0.2141071428571427],
    [1, 1, 13, 0.68, 0.17071428571428557],
    [1, 1, 14, 0.68, 0.13624999999999984],
    [1, 1, 15, 0.6595999999999997, 0.10714285714285714],
    [1, 1, 16, 0.6211999999999998, 0.10714285714285714],
    [1, 1, 17, 0.5703999999999997, 0.10714285714285714],
    [1, 1, 18, 0.56, 0.07089285714285684],
    [1, -1, 17, 0.56, 0.03589285714285684],
    [1, 1, 18, 0.5746000000000003, 0],
    [1, 1, 19, 0.6190000000000003, 0],
    [1, 1, 20, 0.6654000000000003, 0],
    [1, 1, 21, 0.7092000000000003, 0],
    [1, 1, 22, 0.7472000000000004, 0],
    [1, 1, 23, 0.7940000000000005, 0],
    [1, 1, 24, 0.8408000000000004, 0],
    [1, 1, 25, 0.8838000000000004, 0],
    [1, 1, 26, 0.9242000000000005, 0],
    [1, 1, 27, 0.9674000000000005, 0],
    [1, 1, 28, 1, 0],
    [1, 1, 29, 1, 0.04017857142857143],
    [1, 1, 30, 1, 0.07732142857142857],
    [1, 1, 31, 1, 0.10714285714285714],
    [1, -1, 30, 0.9618000000000001, 0.10714285714285714],
    [1, 1, 31, 0.9176000000000002, 0.10714285714285714],
    [1, 1, 32, 0.8754000000000004, 0.10714285714285714],
    [1, 1, 33, 0.8326000000000005, 0.10714285714285714],
    [1, 1, 34, 0.8, 0.12749999999999964],
    [1, 1, 35, 0.8, 0.16374999999999965],
    [1, 1, 36, 0.8, 0.20499999999999965],
    [1, -1, 35, 0.8, 0.24624999999999966],
    [1, -1, 34, 0.8, 0.28053571428571394],
    [1, -1, 33, 0.8075999999999997, 0.32142857142857145],
    [1, 1, 34, 0.8545999999999995, 0.32142857142857145],
    [1, 1, 35, 0.8993999999999995, 0.32142857142857145],
    [1, 1, 36, 0.9439999999999994, 0.32142857142857145],
    [1, 1, 37, 0.9839999999999993, 0.32142857142857145],
    [1, 1, 38, 1, 0.2900000000000005],
    [1, 1, 39, 1, 0.24946428571428617],
    [1, 1, 40, 0.9882000000000005, 0.21428571428571427],
    [1, 1, 41, 0.9462000000000006, 0.21428571428571427],
    [1, 1, 42, 0.92, 0.21428571428571427],
    [1, -1, 41, 0.92, 0.1821428571428571],
    [1, 1, 42, 0.92, 0.14178571428571424]
  ],
  episode4: yourMom
};

export const epsYs = arr => {
  let ysArr = [];
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i][0]) {
      case 0:
        ysArr.push([1, 0, 0, 0]);
        break;
      case 1:
        ysArr.push([0, 1, 0, 0]);
        break;
      case 2:
        ysArr.push([0, 0, 1, 0]);
        break;
      case 3:
        ysArr.push([0, 0, 0, 1]);
    }
  }
  return ysArr;
};

export default eps;