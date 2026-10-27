# GHOST//SIGNAL — The Machine Remembers 👻

> An eerie, privacy-first ghost story experience inspired by **Ghost in the Machine**. Turn a place, a strange detail, and a mood into a short supernatural transmission.

## What it does

- Generates atmospheric ghost stories from a selected setting, optional user-written clue, and mood.
- Offers three story frequencies: **Eerie**, **Melancholic**, and **Folklore**.
- Lets you copy a generated story.
- Uses a responsive, dark terminal-inspired interface.
- Runs as a static website and does not upload the text you enter.

## Project files

```text
ghost-signal/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run it

1. Download or clone this project.
2. Open `index.html` in a browser, or use VS Code's Live Server extension.
3. Choose a place, add an optional strange detail, choose a mood, and click **Receive Transmission**.

The page's fonts are loaded from Google Fonts when internet is available. The core experience itself uses local HTML, CSS, and JavaScript.

## Important: current AI status

**This starter version does not call an AI model yet.** It uses a small local story-template engine in `script.js`, so the demo works without an AI API key and keeps user-entered text in the browser. The interface is designed to be extended with a real open-weight model.

Do not describe this current version as AI-generated. For an open-source AI submission, complete the optional local-model integration below, test it, and then update the project description to match what you actually ran.

## Connect a local open-weight model with Ollama

[Ollama](https://ollama.com/) can run supported open-weight models on your own computer. This can keep prompts local and avoid sending personal stories to a hosted inference provider.

### 1. Install and start a model

Install Ollama from its official website, then download a model that your machine can run. For example, a model such as `qwen2.5:3b` may be a practical starting point on a capable laptop, but model availability, memory needs, and performance vary.

```bash
ollama pull qwen2.5:3b
ollama serve
```

In a second terminal, test it:

```bash
ollama run qwen2.5:3b
```

### 2. Add a small local backend

A browser page opened directly from `file://` cannot reliably call a local model because of browser security and cross-origin restrictions. For a proper integration, run a small local backend (for example, Python + FastAPI) that sends requests to Ollama, then have `script.js` call that backend. Configure CORS only for your local development origin, and bind the service to `127.0.0.1` rather than exposing it publicly.

Ollama's local API documentation: <https://github.com/ollama/ollama/blob/main/docs/api.md>

Example request payload for a backend that proxies the request locally:

```json
{
  "model": "qwen2.5:3b",
  "prompt": "Write a short eerie ghost story set in an abandoned computer lab. Avoid gore. End with an unsettling final line.",
  "stream": false
}
```

A local backend can post that payload to Ollama's local `/api/generate` endpoint and return the model response to the browser. Add error handling for the cases where Ollama is not running or the selected model is not installed.

## Why open innovation matters

- **Privacy and ownership:** with a locally hosted model, family memories, names, and personal prompts can remain on a device you control.
- **Offline potential:** after the model is downloaded, local inference can work without an internet connection, depending on your setup. The static template demo also works offline once its files are on your device.
- **Choice and experimentation:** you can switch compatible open-weight models, adjust prompts, and change the story rules rather than relying on a single closed service.
- **Inspectable and forkable:** the frontend is plain HTML, CSS, and JavaScript, so it is easy to understand, remix, and extend.
- **Cost control:** local inference does not require a per-request hosted API bill, though it still uses your computer's power and hardware.

### Where this approach is better—and its trade-offs

For private remembrance stories, local inference can be preferable to a hosted chatbot because the text need not leave the device. It also gives builders more control over model choice and behavior. However, local models may be slower, require substantial memory, and produce less consistent writing than some hosted models. Model weights and licenses vary, so check the license for the exact model you choose.

## Suggested demo script

1. Select **Old house with marigold candles**.
2. Enter: `A voice on the old recorder remembers a song no one has sung in years`.
3. Choose **Folklore** and click **Receive Transmission**.
4. Generate another version with **Melancholic** to compare the mood.
5. Explain how a local open-weight model could make this a private family-story archive rather than a cloud-dependent chatbot.

## Suggested post for the challenge

**GHOST//SIGNAL — The Machine Remembers 👻**

What if a machine could help us preserve the stories that might otherwise fade away?

I built GHOST//SIGNAL, a spooky story experience inspired by the *Ghost in the Machine* theme. Choose a place, enter a strange detail, and tune the signal to Eerie, Melancholic, or Folklore.

The project starts with a lightweight browser-based prototype. My next step is connecting it to a locally running open-weight model through Ollama, so the experience can generate richer stories without sending private memories to a hosted AI service.

Open innovation matters here because personal stories deserve privacy, model choice, and longevity. A local-first tool can work without a per-request API bill, can be adapted by its community, and can keep sensitive prompts on a device the user controls. Local AI has trade-offs—hardware requirements and output quality among them—but the ability to inspect, switch, and run the system yourself is powerful.

**The goal:** a little haunted, a little human, and built so the stories stay yours.

#OpenSourceAI #Hacktoberfest #GhostInTheMachine #LocalAI #Ollama

## Before publishing

- [ ] Test the page in your target browser.
- [ ] If claiming AI is integrated, implement and test the Ollama backend first.
- [ ] Verify the chosen model's license and hardware requirements.
- [ ] Add screenshots or a short demo GIF.
- [ ] Link your repository and clearly state which parts are implemented versus planned.

## License

Choose and add a license before publishing (for example, MIT for the original project code). A project's code license does not automatically change the license of any model weights you use.
