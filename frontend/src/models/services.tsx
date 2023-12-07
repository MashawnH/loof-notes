

export function createPostNoteData(title: string, body: string) {

  const noteData = {
    title: title,
    body: body
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  };

  return requestOptions;
}
