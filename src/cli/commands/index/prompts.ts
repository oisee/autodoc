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
    Please analyse the content below, detect the type of the content below (**<CODE_UNIT_NAME>** **<CODE_UNIT_TYPE>** ) and provide a summary of the ${contentType} in markdown format.

    ${filePrompt}
    Do not just say "this file is a part of the ${projectName} project".
    Do not just list all the methods or all the variables in the definition sections, only highlight important things".
    Do not repeat the template mechanically, you can adjust it to fit the specifics of the type and sctructure of the code unit.
    ${contentType}:

### Template:
# <FILENAME>

This is a SAP ABAP code unit <FM, report, class> that provides <functions|methods|subroutines> to <Functionality Description>. It includes functions to <List of Main Operations>. 
This template can be used as a starting point for documenting ABAP code units and can be customized as needed to fit the specific needs of your <CODE_UNIT_TYPE>.

## Definition 

**<CODE_UNIT_NAME>** is a <Visibility> <Finality> **<CODE_UNIT_TYPE>** and has <various important methods and interfaces that are aliased for simplicity>. 

\`\`\`abap
class <CLASSNAME> definition <Additional Definitions>.

<Sections>
  <Purpose of Methods>
  methods <Method Definitions>
    <if any, do not just list all the source code, list only most important methods: instantiation, factory method, public methods, etc.>

\`\`\`

## <Instantiation, Factory Methods, events>

The class has a <constructor|factory methods> that accepts <Number of Parameters> parameters:
<Parameter List>

\`\`\`abap
<Constructor explanation>
<Factory methods explanation>
<Events explanation>
\`\`\`

## <Other Methods>
- <List of Other Methods>

## <Exceptions>
This class raises the exception \`<Exception Name>\` in case of any failures.

## Class Implementation
The class implementation part consists of the implementation of all the aforementioned methods. All the methods are well commented which makes it easy to understand the logic behind the code. Error handling has been well implemented with the use of exceptions.

\`\`\`abap
<Class Implementation Explanation>
\`\`\`

## Possible Usages
This class can be used to <List of Possible Usages>. 

## Sample Usages
Here are some examples of how this class can be used:

\`\`\`abap
<Sample Usage Code>
\`\`\`

---
In the template:
- \`<List of Possible Usages>\`: A list of possible ways in which the class can be used.
- \`<Sample Usage Code>\`: Some sample code showing how the class can be used. This can be derived from unit test classes or other code that uses the class.

### file content:

${fileContents}

### ctag index of other files and code-units that is a part of the same project for reference:
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

    ### ctag index of other files and code-units that is a part of the same project for reference:    

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
    Please analyse and detect the type of the content below (**<CODE_UNIT_NAME>** **<CODE_UNIT_TYPE>** ) and decide what diagram type would explain this best.
    DO NOT GENERATE CLASS DIAGRAMS, classDiagram are not supported by Mermaid.
    DO NOT GENERATE ENTITY RELATIONS DIAGRAMS, erDiagram are not supported by Mermaid.

    You can use these types: sequenceDiagram, flowchart, stateDiagram-v2, journey, mindmap or graph LR.
    Provide up to two types of diagrams to explain this file content or none if you decide that diagram is not needed.:
    If the content of the file is not ABAP code, but CDS view or something else - try to generate graph LR diagram.
    
    Please provide a Mermaid diagram that explains this file content ${contentType}:
    ### file content:

    ${fileContents}

    ### ctag index of other files and code-units that is a part of the same project for reference, DO NOT GENERATE A DIAGRAM just based on the list of the ctags, use the content of the file as well:
    ${ctags}

    ### Mermiad Diagram:

    <diagram>

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


/*

# <FILENAME>

This is a SAP ABAP class that provides methods related to <Functionality Description>. It includes methods to <List of Main Operations>. 

## Class Definition 

**<CLASSNAME>** is a <Visibility> <Finality> class and has various important methods and interfaces that are aliased for simplicity. 

```abap
class <CLASSNAME> definition <Additional Definitions>.

<Sections>

  <Purpose of Methods>

  methods <Method Definitions>
```

## <Instantiation, Factory Methods>

The class has a constructor that accepts <Number of Parameters> parameters:

<Parameter List>

```abap
<Constructor Definition>
```

## <Other Methods>

- <List of Other Methods>

## <Exceptions>

This class raises the exception `<Exception Name>` in case of any failures.

## Class Implementation

The class implementation part consists of the implementation of all the aforementioned methods. All the methods are well commented which makes it easy to understand the logic behind the code. Error handling has been well implemented with the use of exceptions.

```abap
<Class Implementation Code>
```

## Possible Usages

This class can be used to <List of Possible Usages>. 

## Sample Usages

Here are some examples of how this class can be used:

```abap
<Sample Usage Code>
```

---

In the template:

- `<List of Possible Usages>`: A list of possible ways in which the class can be used.
- `<Sample Usage Code>`: Some sample code showing how the class can be used. This can be derived from unit test classes or other code that uses the class.

This template can be used as a starting point for documenting ABAP code units and can be customized as needed to fit the specific needs of your project.

*/

/*
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
*/
