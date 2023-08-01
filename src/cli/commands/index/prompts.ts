import { FileSummary, FolderSummary } from '../../../types.js';

export const createCodeFileSummary = (
  filePath: string,
  projectName: string,
  fileContents: string,
  contentType: string,
  filePrompt: string,
  ctags: string,
): string => {
  return `
    You are acting as a ${contentType} documentation expert for a project called ${projectName}.
    Below is the ${contentType} from a file located at \`${filePath}\` and a ctag index for the repository.    
    ${filePrompt}
    Do not say "this file is a part of the ${projectName} project".

    ${contentType}:
    ### file content:
    
    ${fileContents}

    ### ctag index:

    ${ctags}

    ### Response:

  `;
};

export const createCodeQuestions = (
  filePath: string,
  projectName: string,
  fileContents: string,
  contentType: string,
  targetAudience: string,
  ctags: string,
): string => {
  return `
    You are acting as a ${contentType} documentation expert for a project called ${projectName}.
    Below is the ${contentType} from a file located at \`${filePath}\` and a ctag index for the repository.
    What are 1-3 questions that a ${targetAudience} might have about this ${contentType}? 
    Answer each question in 1-3 sentences. Output should be in markdown format.

    ${contentType}:
    ### file content:

    ${fileContents}

    ### ctag index:

    ${ctags}

    ### Questions and Answers:
    
  `;
};
export const createDiagram = (
  filePath: string,
  projectName: string,
  fileContents: string,
  contentType: string,
  targetAudience: string,
  ctags: string,
): string => {
  return `
    You are acting as a ${contentType} documentation expert for a project called ${projectName}.
    Below is the ${contentType} from a file located at \`${filePath}\` and a ctag index for the repository. 
    Please provide a Mermaid diagram that explains this ${contentType}. 

    ${contentType}:
    ### file content:

    ${fileContents}

    ### ctag index:

    ${ctags}

    ### Mermiad Diagram:
    
  `;
};

export const folderSummaryPrompt = (
  folderPath: string,
  projectName: string,
  files: FileSummary[],
  folders: FolderSummary[],
  contentType: string,
  folderPrompt: string,
  ctags: string
): string => {
  return `
    You are acting as a ${contentType} documentation expert for a project called ${projectName}.
    You are currently documenting the folder located at \`${folderPath}\`. 
    
    Below is a list of the files in this folder and a summary of the contents of each file and a ctag index for the repository. 

    ${files.map((file) => {
      return `
        Name: ${file.fileName}
        Summary: ${file.summary}    

      `;
    })}

    And here is a list of the subfolders in this folder and a summary of the contents of each subfolder:

    ${folders.map((folder) => {
      return `
        Name: ${folder.folderName}
        Summary: ${folder.summary}    

      `;
    })}

    ### ctag index:

    ${ctags}

    ###

    ${folderPrompt}
    Do not say "this file is a part of the ${projectName} project".
    Do not just list the files and folders.

    Response:
  `;
};
