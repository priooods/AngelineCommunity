import numpy as np
import librosa
import os
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D

# Extract features from audio file
def extract_features(file_path):
    X, sample_rate = librosa.load(file_path, sr=16000)
    stft = np.abs(librosa.stft(X))
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
    chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0)
    mel = np.mean(librosa.feature.melspectrogram(X, sr=sample_rate).T, axis=0)
    contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T, axis=0)
    tonnetz = np.mean(librosa.feature.tonnetz(y=librosa.effects.harmonic(X), sr=sample_rate).T, axis=0)
    return mfccs, chroma, mel, contrast, tonnetz

# Build the model
def build_model(input_shape):
    model = Sequential()
    model.add(Conv2D(32, (3, 3), activation='relu', input_shape=input_shape))
    model.add(MaxPooling2D((2, 2)))
    model.add(Dropout(0.5))
    model.add(Flatten())
    model.add(Dense(64, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    return model

# Train the model
def train_model(model, X_train, y_train, epochs=10):
    model.fit(X_train, y_train, epochs=epochs, batch_size=32)
    return model

# Evaluate the model
def evaluate_model(model, X_test, y_test):
    loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
    print("Loss: {:.4f}".format(loss))
    print("Accuracy: {:.4f}".format(accuracy))
    return loss, accuracy

# Predict label for new audio file
def predict(model, audio_path):
    mfccs, chroma, mel, contrast, tonnetz = extract_features(audio_path)
    features = np.array([[mfccs, chroma, mel, contrast, tonnetz]])
    prediction = model.predict(features)
    if prediction >= 0.5
	label = 'Positive'
    else:
        label = 'Negative'
    return label

# Load the dataset
def load_dataset(dataset_path):
    X = []
    y = []
    for folder in os.listdir(dataset_path):
        folder_path = os.path.join(dataset_path, folder)
        if os.path.isdir(folder_path):
            label = int(folder == 'Positive')
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)
                mfccs, chroma, mel, contrast, tonnetz = extract_features(file_path)
                features = np.array([mfccs, chroma, mel, contrast, tonnetz])
                X.append(features)
                y.append(label)
    X = np.array(X)
    y = np.array(y)
    return X, y

# Split the dataset into training and testing sets
def split_dataset(X, y, test_size=0.2):
    indices = np.arange(X.shape[0])
    np.random.shuffle(indices)
    X = X[indices]
    y = y[indices]
    split = int(X.shape[0] * (1 - test_size))
    X_train = X[:split]
    y_train = y[:split]
    X_test = X[split:]
    y_test = y[split:]
    return X_train, y_train, X_test, y_test

if __name__ == '__main__':
    dataset_path = 'path/to/dataset'
    X, y = load_dataset(dataset_path)
    X_train, y_train, X_test, y_test = split_dataset(X, y)
    input_shape = (X_train.shape[1], X_train.shape[2], X_train.shape[3])
    model = build_model(input_shape)
    model = train_model(model, X_train, y_train)
    evaluate_model(model, X_test, y_test)
    audio_path = 'path/to/audio_file'
    prediction = predict(model, audio_path)
    print("The audio file is classified as:", prediction)