const pattern = /\/w (?<name>.+) Hi! I want to (?<action>buy|sell): (?<item>.+) for (?<cost>[0-9]+) platinum\. \(warframe\.market\)/

document.addEventListener("copy", async event => {
  const saved = await browser.storage.local.get("templates")
  const templates = saved.templates

  const contents = document.activeElement?.value
  if (!contents) {
    return
  }

  match = contents.match(pattern)
  if (match) {
    event.preventDefault()
    let template = match.groups.action == "buy" ? templates.buy : templates.sell
    if (!template) {
      return
    }
    whisper = `/w {name} ${template}`
    for (const name in match.groups) {
      whisper = whisper.replaceAll(`{${name}}`, match.groups[name])
    }
    await navigator.clipboard.writeText(whisper)
  }
})