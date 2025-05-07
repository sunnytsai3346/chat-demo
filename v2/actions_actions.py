from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from transformers import pipeline
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ActionTranslateMessage(Action):
    def name(self) -> Text:
        return "action_translate_message"

    def __init__(self):
        # Initialize translation pipelines
        # Using Helsinki-NLP models for translation to/from English
        self.to_en_translators = {}
        self.from_en_translators = {}
        self.supported_languages = ['es', 'fr', 'de', 'hi']  # Add more as needed

        for lang in self.supported_languages:
            try:
                self.to_en_translators[lang] = pipeline(
                    f"translation_{lang}_to_en",
                    model=f"Helsinki-NLP/opus-mt-{lang}-en"
                )
                self.from_en_translators[lang] = pipeline(
                    f"translation_en_to_{lang}",
                    model=f"Helsinki-NLP/opus-mt-en-{lang}"
                )
            except Exception as e:
                logger.error(f"Failed to load translation model for {lang}: {e}")

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:
        # Get user message and language
        user_message = tracker.latest_message.get('text')
        language = tracker.latest_message.get('language', 'en')

        logger.info(f"Received message: {user_message} in language: {language}")

        # Translate user message to English if not in English
        if language != 'en' and language in self.to_en_translators:
            try:
                translated_message = self.to_en_translators[language](user_message)[0]['translation_text']
                logger.info(f"Translated to English: {translated_message}")
                # Store translated message for Rasa to process
                tracker.latest_message['text'] = translated_message
            except Exception as e:
                logger.error(f"Translation error for {language} to English: {e}")
                dispatcher.utter_message(text="Sorry, I couldn't translate your message.")
                return []

        # Get bot response (assuming Rasa processes in English)
        bot_response = tracker.get_slot('bot_response') or "I'm here to help!"

        # Translate bot response back to user's language if not English
        if language != 'en' and language in self.from_en_translators:
            try:
                translated_response = self.from_en_translators[language](bot_response)[0]['translation_text']
                logger.info(f"Translated bot response to {language}: {translated_response}")
                dispatcher.utter_message(text=translated_response)
            except Exception as e:
                logger.error(f"Translation error for English to {language}: {e}")
                dispatcher.utter_message(text=bot_response)  # Fallback to English
        else:
            dispatcher.utter_message(text=bot_response)

        return []