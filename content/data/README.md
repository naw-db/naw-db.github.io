### 1. Introduction
Please follow the following conventions when editing:

#### 1.1 CSV
* Name of a data file should be in `snake_case`.
* Column names should be in `lowerCamelCase`.
* Avoid using abbreviations in column names.

#### 1.2 JSON
* Name of a data file should be in `snake_case`.
* Field names should be in `lowerCamelCase`.
* Avoid using abbreviations in field names.

### 2. Player Data
`players.csv`

* Rows should be kept in a particular order:
  * Removed players should be moved to the bottom of the file.
    * Among removed players, rows should be sorted first by `startingRank`, then by player's last name.
  * Players that are still available in the game should be sorted first by `levelAvailable`, then by `startingRank`, and lastly by player's last name.
