import requests
import json

def to_json(filepath, JSONdata):
    with open(filepath, 'w') as f:
        json.dump(JSONdata, f, indent=2)
        print('saved to json')

def read_json(filepath):
    with open('all_mods.json', 'r') as f:
        res = json.load(f)
        return res
    
def from_api(api_link, save_json=False, json_filepath = 'NA'):
    response = requests.get(api_link)
    data = response.json()

    if save_json:
        to_json(json_filepath, data)

# step 1: getting all the courses that fulfill the 4+2 pillars 

pillar_mods = {
    'GEX': [],
    'GEC': [],
    'GES': [],
    'GEN': [],
}

# saving all courses so I don't have to call everytime and overload the api
# from_api(api_link='https://api.nusmods.com/v2/2025-2026/moduleList.json', save_json=True, json_filepath='all_mods.json')


    
all_mods_list = read_json('all_mods.json')
for mod in all_mods_list:
    modCode = mod['moduleCode']
    prefix = modCode[:3]
    if prefix in pillar_mods:
        pillar_mods[prefix].append(modCode)

pillar_mods['default'] = ['CS1010A', 'IS1108']

to_json('target_mods.json', [pillar_mods])