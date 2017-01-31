# dentaku

ウェブブラウザ上で動く電卓アプリです。

## Demo
https://rawgit.com/snoguchi/dentaku/master/index.html

## 使い方

| 計算式                     | キー操作                              | 結果  |
|:--------------------------|:-------------------------------------|-----:|
| 4 - 6 =                   | [4][-][6][=]                         | -2   |
| ( 1 + 2 ) ÷ 3 × 4 - 5.5 = | [1][+][2][÷][3][×][4][-][5][.][5][=] | -1.5 |
| 2 × ( -3 ) =              | [2][×][3][±][=]                      | -6   |

## 修正の例

| 計算式                     | キー操作                              | 結果  |
|:--------------------------|:-------------------------------------|-----:|
| 2 + 3 -> 2 + 4 =          | [2][+][3][CE][4][=]                  | 6    |
| 2 + ... -> 2 - 7 =        | [2][+][-][7][=]                      | -5   |
| 123 -> 122                | [1][2][3][←][2]                      | 122  |

## 節約入力

| 計算式                     | キー操作                              | 結果  |
|:--------------------------|:-------------------------------------|-----:|
| 10 × 1.03 × 1.03 =        | [1][0][×][1][.][0][3][=][=]          | 10.609 |
| 1 + 1 = 2, 2 + 2 = 4, ... | [1][+][=][+][=]...                   | 2, 4, ... |
| 1 + 1 = 2, 5 + 1 = 6, ... | [1][+][1][=][5][=]...                | 2, 6, ... |
