var keywords = ["module","endmodule","assign","input","output","wire","reg","logic","for","return","if",
				"int","long","short","float","double","bool","char","struct","union","do","while","new",
				"always_ff","always_comb","always","var","function","else","typedef","case","continue",
				"break","void","size_t","unsigned"];
			
window.onload = function main() {
	var ListOfCodeBlocks = document.getElementsByClassName("code");
	//iterate through all code blocks
	for (i = 0; i < ListOfCodeBlocks.length; i++) {
		
		//get list of lines of code & escape <,> characters
		var code_str = GetLines(ListOfCodeBlocks[i].innerHTML.replace(/</g,'&lt;').replace(/>/g,'&gt;'));
		var line_count = code_str.length;
		
		//loop through each line
		var result = "";
		var inComment = false;
		for (j = 0; j < line_count-1; j++) {
			result = result + "<code>";
			
			var c_start = code_str[j].indexOf("/*");
			
			if (inComment || c_start != -1) {
				inComment = true;
				if (c_start != -1) {
					result = result + Highlight(code_str[j].substring(0,c_start)) + "<span class=\"comment\">";
					code_str[j] = code_str[j].substring(c_start,code_str[j].length);
				}
				else {
					result = result + "<span class=\"comment\">";
				}
				
				var c_end = code_str[j].indexOf("*/");
				if (c_end != -1) {
					result = result + code_str[j].substring(0,c_end+2) + "</span>" + code_str[j].substring(c_end+2,code_str[j].length);
					inComment = false;
				}
				else {
					result = result + code_str[j] + "</span>";
				}
			}
			
			//single line comment
			else if (code_str[j].indexOf("//") != -1) {
				result = result + Highlight(code_str[j].substring(0,code_str[j].indexOf("//"))) + "<span class=\"comment\">"
				+ code_str[j].substring(code_str[j].indexOf("//")) + "</span>";
			}
			
			//string
			else if (code_str[j].indexOf("\"") != -1) {
				
				strset = code_str[j].split("\"");
				
				var inString = false;
				for (t = 0; t<strset.length; t++) {
					if (inString) {
						result = result + "<span class=\"string\">\"" + strset[t] + "\"</span>";
						inString = false;
					}
					else {
						inString = true;
						result = result + Highlight(strset[t]);
					}
				}
				
			}
			
			else {
				result = result + Highlight(code_str[j]);
			}
			result = result + "</code>" + "\n";
		}
		
		ListOfCodeBlocks[i].innerHTML = result;
	}
};

function Highlight(str) {
	var tokens = str.split(" ");
	var output = "";
	for (k = 0; k < tokens.length; k++) {
		
		var s0 = tokens[k];
		
		if (tokens[k].trim().indexOf("#include") == 0) {
			output = output + "<span class=\"include\">" + tokens[k] + " </span>";
			continue;
		}
		
		for (n = 0; n < keywords.length; n++) {
			if (tokens[k].trim().indexOf(keywords[n]) != -1) {
				var regex = new RegExp("(?:^|[^a-zA-Z0-9_])" + keywords[n] + "(?![a-zA-Z0-9])",'g');
				console.log(tokens[k].trim() + " : " + regex + " : " + regex.exec(tokens[k]));
				if (regex.test(tokens[k])) {
					s0 = tokens[k].replace(regex,'<span class=\"keyword\">$&</span>');
					break;
				}
			}
		}
		
		output = output + s0.replace(/([0-9]+)/g, '<span class=\"constant\">$&</span>').replace(/\'[\x00-\x7F]+\'/g, '<span class=\"char\">$&</span>');
		if (k < tokens.length-1) {
			//don't add space if it is the only/last token
			output = output + " ";
		}
	}
	return output;
}

function GetLines(str) {
	return str.split(/\r\n|\r|\n/);
}