# Interview related files

Document format rules are in `./style.tex`. In order to compile the markdown files to properly formatted PDF files with `pandoc`, use:

    pandoc --include-in-header=style.tex <input-file.md> -o <output-file.pdf>
