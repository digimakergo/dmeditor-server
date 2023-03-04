import * as React from 'react'
import { Component } from 'react'
import { Page } from '../../components/page'
import {DMEditorView} from 'dmeditor';

import './index.css';
import { registerTool } from "dmeditor";
import { toolCarousel, toolEmbedContent, toolContentGallery, toolContentGrid } from "dmeditor-digimaker";

// registerTool(toolData);
registerTool(toolContentGrid);
registerTool(toolEmbedContent);
registerTool(toolCarousel);
registerTool(toolContentGallery);

export default class Index extends Component<{data?:any},{}> {   
render() {  
    return (
      <Page>
        <DMEditorView
                data={this.props.data}
        />
      </Page>
    );
  }
} 