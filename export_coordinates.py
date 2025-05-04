import pandas as pd
from preprocess_data import prepare_data

def export_coordinates():
    X, y = prepare_data()
    df = pd.concat([X, y], axis=1)
    df.to_csv('church_coordinates.csv', index=False)
    print("Exported to church_coordinates.csv")  # Corrected quotes here

if __name__ == "__main__":  # Corrected quotes here
    export_coordinates()
