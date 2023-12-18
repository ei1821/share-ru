FROM python:3.10
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
ADD requirements.txt /backend/
RUN pip install -r requirements.txt
EXPOSE 8000
ADD . /backend/
