import pandas as pd
from geopy.geocoders import Nominatim


def get_coordinates(postcode):
    geolocator = Nominatim(user_agent="church_locator")
    try:
        location = geolocator.geocode(postcode)
        return (location.latitude, location.longitude)
    except:
        return (None, None)


def prepare_data():
    # Step 1: Load Dataset
    data = {
        'Postcode': ['EC1A 1BB', 'W1A 0AX', 'SW1A 1AA'],
        'Latitude': [51.5150, 51.5074, 51.5010],
        'Longitude': [-0.1100, -0.1278, -0.1276],
        'Church_Lat': [51.5155, 51.5078, 51.5015],
        'Church_Long': [-0.1105, -0.1282, -0.1280]
    }
    df = pd.DataFrame(data)

    # Step 2: Geocode Postcodes
    df[['Postcode_Lat', 'Postcode_Long']] = df['Postcode'].apply(lambda x: pd.Series(get_coordinates(x)))

    # Step 3: Drop rows with missing coordinates
    df = df.dropna()

    # Step 4: Prepare features and labels
    X = df[['Postcode_Lat', 'Postcode_Long']]
    y = df[['Church_Lat', 'Church_Long']]

    return X, y

