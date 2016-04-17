CSL = https://raw.githubusercontent.com/citation-style-language/styles/master/chicago-author-date.csl
CSL_PATH = ./.pandoc/chicago-author-date.csl
OUTPUT = draft.pdf
METADATA = metadata.yaml
BUILD_ORDER = src/introduction.md src/interviews.md src/literature-review.md src/glossary.md src/references.md

all: csl build

csl:
	if ! [ -f $(CSL_PATH) ]; then curl $(CSL) --create-dirs -o $(CSL_PATH); fi;

build: prebuild
	pandoc --standalone --smart --number-sections --include-in-header=style.tex --filter=pandoc-fignos --biblio=../references.bib --filter=pandoc-citeproc --csl=$(CSL_PATH) --from markdown+autolink_bare_uris --output build/$(OUTPUT) $(METADATA) $(BUILD_ORDER)

prebuild:
	mkdir build

open:
	open ./build/$(OUTPUT)

osx-install:
	brew install pandoc;
	pip install pandoc-fignos;
	brew install pandoc-citeproc;

clean:
	rm -rf build && rm -rf .pandoc
