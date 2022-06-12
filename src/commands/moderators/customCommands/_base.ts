import { MessageActionRow, Modal, ModalSubmitFieldsResolver, TextInputComponent } from 'discord.js';

export const createModal = (x: Modal): Modal =>
    x
        .setTitle('Add custom command')
        .addComponents(
            new MessageActionRow<TextInputComponent>().addComponents(
                new TextInputComponent()
                    .setCustomId('commandName')
                    .setLabel('Command name')
                    .setStyle('SHORT')
                    .setPlaceholder('Name of the new command')
                    .setRequired(true)
                    .setMaxLength(255),
            ),
        )
        .addComponents(
            new MessageActionRow<TextInputComponent>().addComponents(
                new TextInputComponent()
                    .setCustomId('returnValue')
                    .setLabel('Return value')
                    .setStyle('PARAGRAPH')
                    .setPlaceholder('This is the text that gets put in chat when this command gets executed')
                    .setRequired(true),
            ),
        );

export const getFields = (x: ModalSubmitFieldsResolver): { name: string; command: string } => {
    const name = x.getField('commandName').value;
    const command = x.getField('returnValue').value;
    return { name, command };
};
