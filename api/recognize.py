import os
from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1 import RecognitionConfig
from pydub import AudioSegment
import io


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'client_service_key.json'

async def recognize(audiofile):
    speech_client = speech_v1p1beta1.SpeechClient()


    # Sample rate in Hertz of the audio data sent
    sample_rate_hertz = 16000
    encoding = RecognitionConfig.AudioEncoding.OGG_OPUS


    content = await audiofile.read()


    audio = {"content": content}
    config = {
        "encoding": encoding,
        "sample_rate_hertz": sample_rate_hertz,
        "enable_automatic_punctuation": True,
        "language_code": 'es-AR',
        "model": 'default'
    }

    config_obj = RecognitionConfig(config)

    # Transcribing the RecognitionAudio objects

    response = speech_client.recognize(
        config=config_obj,
        audio=audio
    )
    print(f'response: {response}')
    converted_text = ""
    for result in response.results:
        print(f'result: {result}')
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        converted_text+=(u"{}\n".format(alternative.transcript))
    return converted_text


def modifySpeed(file):
    # Load the audio data into a pydub AudioSegment object
    audio_segment = AudioSegment.from_ogg(io.BytesIO(file))

    # Modify the audio segment
    modified_audio_segment = audio_segment \
        .high_pass_filter(100) \
        .apply_gain(10)
    modified_audio_segment.export(format='ogg')
    # Export the modified audio segment to a byte string
    modified_content = modified_audio_segment.export(format='ogg').read()

    return modified_content