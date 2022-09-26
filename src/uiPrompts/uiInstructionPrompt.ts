import * as ui from '@dcl/ui-scene-utils'

export let createUiInstructionPrompt = new ui.CustomPrompt(ui.PromptStyles.LIGHTLARGE, 924,395)
createUiInstructionPrompt.canvas = new UICanvas()
createUiInstructionPrompt.background.source = (new Texture("images/Instruccions/msg514499137-3742.jpg")) //add rebeca design here
createUiInstructionPrompt.background.height = 395
createUiInstructionPrompt.background.width = 924
createUiInstructionPrompt.background.hAlign = 'center'
createUiInstructionPrompt.background.vAlign = 'center'
createUiInstructionPrompt.background.sourceHeight = 395
createUiInstructionPrompt.background.sourceWidth = 924
createUiInstructionPrompt.closeIcon.visible = true
createUiInstructionPrompt.closeIcon.positionX = 430
createUiInstructionPrompt.closeIcon.positionY = 170
createUiInstructionPrompt.hide()