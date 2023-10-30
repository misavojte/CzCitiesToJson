import pandas as pd
import json as json


# Function to convert special Czech characters to basic Latin characters and makes it lowercase
def simplify_czech_text_for_search(text):
    text = text.replace(" ", "")
    text = text.replace("-", "")
    czech_to_basic = {
        'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e',
        'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's',
        'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z'
    }
    return ''.join(czech_to_basic.get(char, char) for char in text.lower())


# Import data from Excel file, sheet number 1
df = pd.read_excel('input.xls', sheet_name=0)

id_column_name = "KOD_OBEC,C,6"
name_column_name = "NAZ_OBEC,C,40"
lau1_column_name = "NAZ_LAU1,C,40"

json_export_object = []
json_ids = []

for index, row in df.iterrows():
    json_object = {
        "id": row[id_column_name],
        # "name": row[name_column_name],
        # "lau1": row[lau1_column_name],
        "label": row[name_column_name] + " (okres " + row[lau1_column_name] + ")",
        "simpleName": simplify_czech_text_for_search(row[name_column_name])
    }
    # Only append if there is not a object with the same id
    if row[id_column_name] not in json_ids:
        json_export_object.append(json_object)
        json_ids.append(row[id_column_name])

# Export to JSON file
with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(json_export_object, f, ensure_ascii=False, indent=1)


# Print number of objects in JSON file
print("Number of objects: " + str(len(json_export_object)))
