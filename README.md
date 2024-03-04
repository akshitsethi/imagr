# Imagr
Command line utility for converting images to desired format.

It supports conversion from/to the following formats: 
- jpg
- png
- bmp
- tiff
- gif

***Support for HEIC is planned for the future.*

To use the CLI tool, open terminal and follow the steps below:
1. Clone the repository

```
git clone git@github.com:akshitsethi/imagr.git
```

2. Go inside directory & install the Node script globally

```
cd imagr && npm install -g .
```

3. That's it! The `imagr` command would now be available. To convert a PNG image to JPG (with 100% quality), use the following command:

```
imagr convert image.png -f jpg -n new-image -q 100
```

This will write an image `new-image.jpg` to the same folder as the PNG image.
