# Use Python3.7.5 container image
FROM python:3.7

# Copy current dir to /app
COPY . /app

# Set the working directory to /app
WORKDIR /app

# Install dependencies
RUN pip install -r requirements.txt

# Run the command to start uWSGI
ENTRYPOINT ["python run.py"]