## FTP / FTPS Source Setup

Check out our [quick start guide](https://docs.buildable.dev/) to learn how to get started.

Events:

- `connection.connected`: The connection to the FTP Server has been established.
- `connection.disconnected`: The connection to the FTP Server has been closed.
- `connection.failed`: The connection to the FTP Server has failed.
- `files-metadata.scanned`: The metadata of the files has been scanned.
- `files-metadata.state.processed`: The metadata of the files has been processed.
- `file.added`: A new file has been added.
- `file.updated`: A file has been updated.
- `file.deleted`: A file has been deleted.
- `file.parsed`: A file has been parsed.
- `file.parsed.failed`: A file has failed to be parsed.
- `record.parsed`: A record in a file has been parsed.
- `record.unknown`: A record in a file has an unknown type.
- `record.size.maximum-limit-exceeded`: A record in a file has exceeded the maximum size limit.