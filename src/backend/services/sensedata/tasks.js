export function getDateCollectTask(tasks, limit, page, next_page) {
  const newTasks = tasks.filter(item => item.description === "Coleta de Dados")
  const newTasksObject = {tasks: [], per_page: limit, current_page: page, count: newTasks.length ,next_page: next_page }

  newTasks.map(item => {
    newTasksObject.tasks.push({
      id: item.id,
      id_legacy: item.id_legacy,
      customer: item.customer,
      playbook: item.playbook,
      rule: item.rule,
      contact: item.contact,
      parent: item.parent,
      owner: item.owner,
      created_by: item.created_by,
      updated_by: item.updated_by,
      type: item.type,
      status: item.status,
      priority: item.priority,
      group: item.group,
      description: item.description,
      notes: item.notes,
      created_on: item.created_on,
      start_date: item.start_date,
      due_date: item.due_date,
      end_date: item.end_date,
      hours_spent: item.hours_spent,
      hours_planned: item.hours_planned,
      progress: item.progress,
      tags: item.tags,
      created_at: item.created_at,
      system_end_date: item.system_end_date,
      updated_at: item.updated_at,
      custom_value: item.custom_value,
      favorite: item.favorite,
      id_parent: item.id_parent,
      id_playbook: item.id_playbook,
      id_rule: item.id_rule,
      id_customer: item.id_customer,
      id_contact: item.id_contact
    })
  })

 return newTasksObject
}