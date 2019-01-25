export interface TemplateData {
  tenant: {css: string};
  nodes: Node[];
  templates: Template[];
}

interface Node {
  id: number;
  title: string;
  content: {
    html: string;
  };
  ancestry: string;
  ordering: number;
  name: string;
  template_id: number;
  layout_id: number;
}

interface Template {
  id: number;
  name: string;
  template_type: string;
  content: string;
  css: string;
}
