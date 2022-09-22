import * as ui from '@dcl/ui-scene-utils'

export let createUiPrompt1 = new ui.CustomPrompt(ui.PromptStyles.LIGHTLARGE, 1067, 533)
createUiPrompt1.canvas = new UICanvas()
createUiPrompt1.background.source = (new Texture("")) //add rebeca design here
createUiPrompt1.background.height = 533
createUiPrompt1.background.width = 1067
createUiPrompt1.background.hAlign = 'center'
createUiPrompt1.background.vAlign = 'center'
createUiPrompt1.background.sourceHeight = 2134
createUiPrompt1.background.sourceWidth = 4267
createUiPrompt1.closeIcon.visible = true
createUiPrompt1.closeIcon.positionX = 450
createUiPrompt1.closeIcon.positionY = 180
createUiPrompt1.hide()