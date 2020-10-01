function $(id) {
	return document.getElementById(id);
}

function displayTag(tagName, display) {
	$(tagName).style.display = display;
}

function hideTag(tagName) {
	displayTag(tagName, 'none');
}

function inlineTag(tagName) {
	displayTag(tagName, 'inline');
}

function getSelectValue(tag) {
	return tag.options[tag.selectedIndex].value;
}
