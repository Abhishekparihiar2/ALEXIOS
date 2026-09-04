(() => {
  const categories = ["Licenses & Permits", "Training & Certifications", "Languages", "Diplomas", "Other"];
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  if (!document.getElementById("skills-details-v2-style")) {
    const style = document.createElement("style");
    style.id = "skills-details-v2-style";
    style.textContent = `
      body.skills-page-active select[data-region-filter]{display:none!important}
      .sk2-overlay{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.76);backdrop-filter:blur(8px)}
      .sk2-dialog{width:min(620px,100%);max-height:90vh;overflow:auto;color:#e2e8f0;background:#111;border:1px solid #334155;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.6)}
      .sk2-head{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;gap:16px;padding:22px 26px;background:#111;border-bottom:1px solid #262626}.sk2-head h3{margin:0 0 5px;color:#fff;font-size:20px}.sk2-head p{margin:0;color:#94a3b8;font-size:13px}
      .sk2-body{padding:24px 26px}.sk2-section{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #262626}.sk2-section:last-child{margin:0;border:0}.sk2-section h4{margin:0 0 14px;color:#fff;font-size:14px}.sk2-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.sk2-full{grid-column:1/-1}
      .sk2-field label,.sk2-label{display:block;margin-bottom:7px;color:#cbd5e1;font-size:12px;font-weight:700}.sk2-field input,.sk2-field select,.sk2-field textarea{width:100%;padding:10px 12px;color:#e2e8f0;background:#000;border:1px solid #334155;border-radius:9px;outline:none;font-size:13px}.sk2-field input:focus,.sk2-field select:focus,.sk2-field textarea:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.13)}
      .sk2-check{display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;font-size:13px;font-weight:600;cursor:pointer}.sk2-check input{width:16px;height:16px;margin-top:1px;accent-color:#2563eb}.sk2-panel{margin-top:12px;padding:14px;background:#1a1a1a;border:1px solid #262626;border-radius:10px}
      .sk2-value{min-height:42px;padding:11px 12px;color:#e2e8f0;background:#080808;border:1px solid #262626;border-radius:9px;font-size:13px;line-height:1.45}.sk2-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}.sk2-stat{padding:14px;background:#080808;border:1px solid #262626;border-radius:10px}.sk2-stat strong{display:block;color:#fff;font-size:20px}.sk2-stat span{color:#94a3b8;font-size:12px}.sk2-stat-button{width:100%;text-align:left;cursor:pointer;transition:border-color .15s,background .15s}.sk2-stat-button:hover{border-color:#3b82f6;background:#0f172a}.sk2-stat-button small{display:block;margin-top:7px;color:#60a5fa;font-size:11px;font-weight:700}
      .sk2-toolbar{display:grid;grid-template-columns:1fr 180px;gap:10px;margin-bottom:14px}.sk2-toolbar input,.sk2-toolbar select{width:100%;padding:10px 12px;color:#e2e8f0;background:#000;border:1px solid #334155;border-radius:9px}.sk2-employee-list{display:flex;flex-direction:column;gap:8px}.sk2-employee{display:grid;grid-template-columns:minmax(170px,1.4fr) minmax(120px,.8fr) minmax(150px,1fr);align-items:center;gap:12px;padding:12px 14px;background:#080808;border:1px solid #262626;border-radius:10px}.sk2-position{display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;padding:14px;background:#080808;border:1px solid #262626;border-radius:10px}.sk2-person{display:flex;align-items:center;gap:10px}.sk2-avatar{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;color:#bfdbfe;background:#1e3a8a;font-size:11px;font-weight:800}.sk2-person strong{display:block;color:#fff;font-size:13px}.sk2-person small,.sk2-dates{color:#94a3b8;font-size:11px}.sk2-status{justify-self:start;padding:4px 8px;border-radius:999px;font-size:11px;font-weight:800}.sk2-complete{color:#4ade80;background:rgba(34,197,94,.12)}.sk2-expiring{color:#fbbf24;background:rgba(245,158,11,.12)}.sk2-progress{color:#60a5fa;background:rgba(59,130,246,.12)}.sk2-missing{color:#f87171;background:rgba(239,68,68,.12)}.sk2-remove{padding:7px 10px;border:1px solid rgba(239,68,68,.35);border-radius:7px;color:#f87171;background:rgba(239,68,68,.08);font-size:12px;font-weight:700;cursor:pointer}
      .sk2-actions{position:sticky;bottom:0;display:flex;justify-content:flex-end;gap:9px;padding:16px 26px;background:#111;border-top:1px solid #262626}.sk2-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:9px 16px;border:1px solid #334155;border-radius:8px;color:#e2e8f0;background:transparent;font-size:13px;font-weight:700;cursor:pointer}.sk2-primary{border-color:#2563eb;color:#fff;background:#2563eb}.sk2-head-actions{display:flex;align-items:center;gap:10px;flex-shrink:0}.sk2-badge{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:5px 11px;border:1px solid rgba(34,197,94,.35);border-radius:999px;color:#4ade80;background:rgba(34,197,94,.1);font-size:11px;line-height:1;font-weight:800;white-space:nowrap;flex-shrink:0}
      @media(max-width:640px){.sk2-grid,.sk2-stats,.sk2-toolbar{grid-template-columns:1fr}.sk2-employee{grid-template-columns:1fr}.sk2-status{justify-self:start}.sk2-full{grid-column:auto}.sk2-head,.sk2-body{padding-left:18px;padding-right:18px}}
    `;
    document.head.appendChild(style);
  }

  const makeOverlay = html => {
    const overlay = document.createElement("div"); overlay.className = "sk2-overlay";
    const dialog = document.createElement("div"); dialog.className = "sk2-dialog"; dialog.innerHTML = html;
    overlay.appendChild(dialog); document.body.appendChild(overlay);
    const close = () => { document.removeEventListener("keydown", key); overlay.remove(); };
    const key = event => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", key); return { dialog, close };
  };

  const getModel = (row, name, category) => row._skillModel || (row._skillModel = {
    name, category, description:`${name} qualification requirements and verification details.`, url:"",
    expires:row.textContent.includes("Expiring Soon"), validity:"2", unit:"Years", reminders:true,
    documentRequired:true, active:!row.textContent.includes("Inactive"),
    employees:row.cells?.[3]?.textContent.trim() || "0", positions:row.cells?.[4]?.textContent.trim() || "0"
  });
  const field = (label, value, full="") => `<div class="sk2-field ${full}"><span class="sk2-label">${label}</span><div class="sk2-value">${escapeHtml(value || "—")}</div></div>`;
  const usage = (data, interactive=false) => `<div class="sk2-stats">${interactive?`<button id="sv-employees" class="sk2-stat sk2-stat-button"><strong>${escapeHtml(data.employees)}</strong><span>Assigned Employees</span><small>View completion status →</small></button><button id="sv-positions" class="sk2-stat sk2-stat-button"><strong>${escapeHtml(data.positions)}</strong><span>Assigned Positions</span><small>Manage positions →</small></button>`:`<div class="sk2-stat"><strong>${escapeHtml(data.employees)}</strong><span>Assigned Employees</span></div><div class="sk2-stat"><strong>${escapeHtml(data.positions)}</strong><span>Assigned Positions</span></div>`}</div>`;

  const employeeRows = data => {
    const first=["Marcus","Sarah","James","Nina","Daniel","Aisha","Carlos","Emily","Jordan","Priya"], last=["Johnson","Chen","Rivera","Patel","Williams","Okafor","Santos","Jenkins","Morrison","Lee"];
    const statuses=["Completed","Completed","Expiring Soon","In Progress","Missing Document"];
    const count=Math.max(0,Math.min(parseInt(data.employees,10)||0,200));
    return Array.from({length:count},(_,i)=>({name:`${first[i%first.length]} ${last[(i*3)%last.length]}`,id:`EMP-${String(i+41).padStart(4,"0")}`,status:statuses[i%statuses.length],issue:i%5===3?"Not issued":"Jan 15, 2025",expiry:i%5===2?"Oct 30, 2026":i%5===3?"—":"Jan 15, 2027"}));
  };
  const openAssignEmployee = (data, employees, onAdded) => {
    const modal=makeOverlay(`<div class="sk2-head"><div><h3>Assign Employee</h3><p>Add an employee to ${escapeHtml(data.name)}.</p></div></div><div class="sk2-body"><div class="sk2-grid"><div class="sk2-field sk2-full"><label>Employee <b style="color:#ef4444">*</b></label><select id="sa-employee"><option value="">Select an employee...</option><option value="Olivia Brown|EMP-0204">Olivia Brown · EMP-0204</option><option value="Ethan Davis|EMP-0205">Ethan Davis · EMP-0205</option><option value="Sophia Wilson|EMP-0206">Sophia Wilson · EMP-0206</option><option value="Noah Martinez|EMP-0207">Noah Martinez · EMP-0207</option></select></div><div class="sk2-field"><label>Completion Status</label><select id="sa-status"><option>In Progress</option><option>Completed</option><option>Missing Document</option></select></div><div class="sk2-field"><label>Issue Date</label><input id="sa-issue" type="date"></div><div class="sk2-field"><label>Expiration Date</label><input id="sa-expiry" type="date"></div></div></div><div class="sk2-actions"><button id="sa-cancel" class="sk2-btn">Cancel</button><button id="sa-save" class="sk2-btn sk2-primary"><span style="font-size:18px;line-height:1">+</span> Assign Employee</button></div>`);
    const select=modal.dialog.querySelector("#sa-employee");
    modal.dialog.querySelector("#sa-cancel").addEventListener("click",modal.close);
    modal.dialog.querySelector("#sa-save").addEventListener("click",()=>{if(!select.value){select.style.borderColor="#ef4444";return;}const [name,id]=select.value.split("|");const status=modal.dialog.querySelector("#sa-status").value;employees.unshift({name,id,status,issue:modal.dialog.querySelector("#sa-issue").value||"Not issued",expiry:modal.dialog.querySelector("#sa-expiry").value||"—"});data.employees=String((parseInt(data.employees,10)||0)+1);onAdded();modal.close();});
  };
  const openEmployees = data => {
    const employees=employeeRows(data);
    const modal=makeOverlay(`<div class="sk2-head"><div><h3>Assigned Employees</h3><p>${escapeHtml(data.name)} · Skill completion status</p></div><div class="sk2-head-actions"><span id="se-count" class="sk2-badge">${escapeHtml(data.employees)} ASSIGNED</span><button id="se-add" class="sk2-btn sk2-primary" aria-label="Assign Employee"><span style="font-size:18px;line-height:1">+</span> Assign Employee</button></div></div><div class="sk2-body"><div class="sk2-toolbar"><input id="se-search" placeholder="Search employee name or ID"><select id="se-filter"><option>All Statuses</option><option>Completed</option><option>Expiring Soon</option><option>In Progress</option><option>Missing Document</option></select></div><div id="se-list" class="sk2-employee-list"></div><p id="se-empty" style="display:none;color:#94a3b8;text-align:center;padding:24px">No employees match these filters.</p></div><div class="sk2-actions"><button id="se-close" class="sk2-btn sk2-primary">Done</button></div>`);
    const list=modal.dialog.querySelector("#se-list"),empty=modal.dialog.querySelector("#se-empty"),search=modal.dialog.querySelector("#se-search"),filter=modal.dialog.querySelector("#se-filter"),count=modal.dialog.querySelector("#se-count");
    const render=()=>{const term=search.value.trim().toLowerCase(),status=filter.value;const rows=employees.filter(e=>(!term||e.name.toLowerCase().includes(term)||e.id.toLowerCase().includes(term))&&(status==="All Statuses"||e.status===status));list.innerHTML=rows.map(e=>`<div class="sk2-employee" data-emp-id="${escapeHtml(e.id)}"><div class="sk2-person"><span class="sk2-avatar">${escapeHtml(e.name.split(" ").map(x=>x[0]).join(""))}</span><div><strong>${escapeHtml(e.name)}</strong><small>${escapeHtml(e.id)}</small></div></div><span class="sk2-status sk2-${e.status==="Completed"?"complete":e.status==="Expiring Soon"?"expiring":e.status==="In Progress"?"progress":"missing"}">${escapeHtml(e.status)}</span><div class="sk2-dates"><b style="color:#cbd5e1">Issued:</b> ${escapeHtml(e.issue)}<br><b style="color:#cbd5e1">Expires:</b> ${escapeHtml(e.expiry)}</div><div style="display:flex;align-items:center;gap:8px;flex-shrink:0"><button type="button" title="Download Document" data-download-emp="${escapeHtml(e.id)}" style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid #334155;border-radius:7px;background:transparent;color:#60a5fa;cursor:pointer" aria-label="Download Document"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button><button type="button" class="sk2-remove" data-remove-emp="${escapeHtml(e.id)}">Remove</button></div></div>`).join("");empty.style.display=rows.length?"none":"block";};
    search.addEventListener("input",render);filter.addEventListener("change",render);
    list.addEventListener("click",event=>{
      const removeBtn=event.target.closest("[data-remove-emp]");
      if(removeBtn){event.preventDefault();event.stopPropagation();const id=removeBtn.getAttribute("data-remove-emp");const idx=employees.findIndex(e=>e.id===id);if(idx>=0){employees.splice(idx,1);data.employees=String(employees.length);count.textContent=`${data.employees} ASSIGNED`;const viewCount=document.querySelector("#sv-employees strong");if(viewCount)viewCount.textContent=data.employees;render();}return;}
      const dlBtn=event.target.closest("[data-download-emp]");
      if(dlBtn){event.preventDefault();event.stopPropagation();const id=dlBtn.getAttribute("data-download-emp");const emp=employees.find(e=>e.id===id);const toast=document.createElement("div");toast.style.cssText="position:fixed;right:24px;bottom:24px;z-index:20000;padding:12px 16px;border:1px solid #1e3a8a;border-radius:9px;background:#0f172a;color:#93c5fd;font-size:13px;font-weight:700";toast.textContent=`Downloading document for ${emp?.name||id}…`;document.body.appendChild(toast);setTimeout(()=>toast.remove(),2500);}
    });
    modal.dialog.querySelector("#se-close").addEventListener("click",modal.close);modal.dialog.querySelector("#se-add").addEventListener("click",()=>openAssignEmployee(data,employees,()=>{count.textContent=`${data.employees} ASSIGNED`;const viewCount=document.querySelector("#sv-employees strong");if(viewCount)viewCount.textContent=data.employees;search.value="";filter.value="All Statuses";render();}));render();
  };
  const positionRows = data => {
    if(data.positionAssignments)return data.positionAssignments;
    const names=["Security Guard","Shift Supervisor","Site Manager","Patrol Officer","Operations Coordinator","Mobile Response Officer"];
    const count=Math.max(0,Math.min(parseInt(data.positions,10)||0,100));
    return data.positionAssignments=Array.from({length:count},(_,i)=>({name:`${names[i%names.length]}${i>=names.length?` ${Math.floor(i/names.length)+1}`:""}`,id:`POS-${String(i+1).padStart(3,"0")}`}));
  };
  const openAssignPosition = (data,positions,onAdded) => {
    const modal=makeOverlay(`<div class="sk2-head"><div><h3>Assign Position</h3><p>Add a position requirement to ${escapeHtml(data.name)}.</p></div></div><div class="sk2-body"><div class="sk2-field"><label>Position <b style="color:#ef4444">*</b></label><select id="sp-position"><option value="">Select a position...</option><option value="Regional Supervisor|POS-101">Regional Supervisor</option><option value="Field Inspector|POS-102">Field Inspector</option><option value="Control Room Operator|POS-103">Control Room Operator</option><option value="Account Manager|POS-104">Account Manager</option></select></div></div><div class="sk2-actions"><button id="sp-cancel" class="sk2-btn">Cancel</button><button id="sp-save" class="sk2-btn sk2-primary"><span style="font-size:18px">+</span> Assign Position</button></div>`);
    const select=modal.dialog.querySelector("#sp-position");modal.dialog.querySelector("#sp-cancel").addEventListener("click",modal.close);modal.dialog.querySelector("#sp-save").addEventListener("click",()=>{if(!select.value){select.style.borderColor="#ef4444";return;}const [name,id]=select.value.split("|");if(!positions.some(p=>p.id===id))positions.unshift({name,id});data.positions=String(positions.length);onAdded();modal.close();});
  };
  const openPositions = data => {
    const positions=positionRows(data);const modal=makeOverlay(`<div class="sk2-head"><div><h3>Assigned Positions</h3><p>${escapeHtml(data.name)} · Position requirements</p></div><div class="sk2-head-actions"><span id="sp-count" class="sk2-badge">${escapeHtml(data.positions)} ASSIGNED</span><button id="sp-add" class="sk2-btn sk2-primary"><span style="font-size:18px">+</span> Assign Position</button></div></div><div class="sk2-body"><div class="sk2-toolbar" style="grid-template-columns:1fr"><input id="sp-search" placeholder="Search position name or ID"></div><div id="sp-list" class="sk2-employee-list"></div><p id="sp-empty" style="display:none;color:#94a3b8;text-align:center;padding:24px">No positions assigned.</p></div><div class="sk2-actions"><button id="sp-close" class="sk2-btn sk2-primary">Done</button></div>`);
    const list=modal.dialog.querySelector("#sp-list"),empty=modal.dialog.querySelector("#sp-empty"),search=modal.dialog.querySelector("#sp-search"),count=modal.dialog.querySelector("#sp-count");
    const sync=()=>{data.positions=String(positions.length);count.textContent=`${data.positions} ASSIGNED`;const viewCount=document.querySelector("#sv-positions strong");if(viewCount)viewCount.textContent=data.positions;};
    const render=()=>{const term=search.value.trim().toLowerCase(),rows=positions.filter(p=>!term||p.name.toLowerCase().includes(term)||p.id.toLowerCase().includes(term));list.innerHTML=rows.map(p=>`<div class="sk2-position" data-position-id="${escapeHtml(p.id)}"><div class="sk2-person"><span class="sk2-avatar">${escapeHtml(p.name.split(" ").map(x=>x[0]).join(""))}</span><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.id)}</small></div></div><button type="button" class="sk2-remove" data-remove-position="${escapeHtml(p.id)}">Remove</button></div>`).join("");empty.style.display=rows.length?"none":"block";};
    list.addEventListener("click",event=>{const button=event.target.closest("[data-remove-position]");if(!button)return;event.preventDefault();event.stopPropagation();const index=positions.findIndex(p=>p.id===button.getAttribute("data-remove-position"));if(index>=0){positions.splice(index,1);sync();render();}});
    search.addEventListener("input",render);modal.dialog.querySelector("#sp-close").addEventListener("click",modal.close);modal.dialog.querySelector("#sp-add").addEventListener("click",()=>openAssignPosition(data,positions,()=>{sync();search.value="";render();}));sync();render();
  };

  const openEdit = (data, save) => {
    const options = categories.map(c => `<option${c === data.category ? " selected" : ""}>${c}</option>`).join("");
    const modal = makeOverlay(`<div class="sk2-head"><div><h3>Edit Skill / Certification</h3><p>Update the qualification using the same structure as Add Skill.</p></div></div><div class="sk2-body">
      <section class="sk2-section"><h4>Basic Information</h4><div class="sk2-grid"><div class="sk2-field sk2-full"><label>Skill Name <b style="color:#ef4444">*</b></label><input id="sk-name" value="${escapeHtml(data.name)}"></div><div class="sk2-field"><label>Category <b style="color:#ef4444">*</b></label><select id="sk-category">${options}</select></div><div class="sk2-field"><label>Verification / Reference URL</label><input id="sk-url" type="url" placeholder="https://" value="${escapeHtml(data.url)}"></div><div class="sk2-field sk2-full"><label>Description</label><textarea id="sk-description" rows="3">${escapeHtml(data.description)}</textarea></div></div></section>
      <section class="sk2-section"><h4>Validity & Expiration</h4><label class="sk2-check"><input id="sk-expires" type="checkbox"${data.expires?" checked":""}><span>Does this certification expire?</span></label><div id="sk-validity-panel" class="sk2-panel" style="display:${data.expires?"block":"none"}"><div class="sk2-grid"><div class="sk2-field"><label>Default Validity Period</label><input id="sk-validity" type="number" min="1" value="${escapeHtml(data.validity)}"></div><div class="sk2-field"><label>Unit</label><select id="sk-unit">${["Years","Months","Days"].map(u=>`<option${u===data.unit?" selected":""}>${u}</option>`).join("")}</select></div></div><label class="sk2-check" style="margin-top:14px"><input id="sk-reminders" type="checkbox"${data.reminders?" checked":""}><span>Enable Expiration Reminders</span></label></div></section>
      <section class="sk2-section"><h4>Requirements</h4><label class="sk2-check"><input id="sk-document" type="checkbox"${data.documentRequired?" checked":""}><span>Require Supporting Document on Assignment</span></label></section>
      <section class="sk2-section"><h4>Current Usage</h4>${usage(data)}<p style="margin:10px 0 0;color:#64748b;font-size:12px">Assignments are managed from employee and position records.</p></section>
      <section class="sk2-section"><h4>Status</h4><div class="sk2-field"><label>Status <b style="color:#ef4444">*</b></label><select id="sk-status"><option value="active"${data.active?" selected":""}>Active</option><option value="inactive"${data.active?"":" selected"}>Inactive</option></select></div></section>
    </div><div class="sk2-actions"><button id="sk-cancel" class="sk2-btn">Cancel</button><button id="sk-save" class="sk2-btn sk2-primary">Save Changes</button></div>`);
    const q = id => modal.dialog.querySelector(id);
    q("#sk-expires").addEventListener("change", e => q("#sk-validity-panel").style.display = e.target.checked ? "block" : "none");
    q("#sk-cancel").addEventListener("click", modal.close);
    q("#sk-save").addEventListener("click", () => {
      if (!q("#sk-name").value.trim()) { q("#sk-name").style.borderColor="#ef4444"; return; }
      Object.assign(data,{name:q("#sk-name").value.trim(),category:q("#sk-category").value,url:q("#sk-url").value.trim(),description:q("#sk-description").value.trim(),expires:q("#sk-expires").checked,validity:q("#sk-validity").value,unit:q("#sk-unit").value,reminders:q("#sk-reminders").checked,documentRequired:q("#sk-document").checked,active:q("#sk-status").value==="active"});
      save(data); modal.close();
    });
  };

  const openView = (data, edit) => {
    const modal = makeOverlay(`<div class="sk2-head"><div><h3>Skill / Certification Details</h3><p>Complete qualification configuration and current usage.</p></div><span class="sk2-badge"${data.active?"":' style="color:#94a3b8;border-color:#475569;background:#1e293b"'}>${data.active?"ACTIVE":"INACTIVE"}</span></div><div class="sk2-body">
      <section class="sk2-section"><h4>Basic Information</h4><div class="sk2-grid">${field("Skill Name",data.name,"sk2-full")}${field("Category",data.category)}${field("Verification / Reference URL",data.url)}${field("Description",data.description,"sk2-full")}</div></section>
      <section class="sk2-section"><h4>Validity & Expiration</h4><div class="sk2-grid">${field("Expiration",data.expires?`Every ${data.validity} ${data.unit}`:"Does not expire")}${field("Expiration Reminders",data.expires&&data.reminders?"Enabled":"Disabled")}</div></section>
      <section class="sk2-section"><h4>Requirements</h4><div class="sk2-grid">${field("Supporting Document",data.documentRequired?"Required on assignment":"Not required")}${field("Status",data.active?"Active":"Inactive")}</div></section>
      <section class="sk2-section"><h4>Current Usage</h4>${usage(data,true)}</section></div><div class="sk2-actions"><button id="sv-close" class="sk2-btn">Close</button><button id="sv-edit" class="sk2-btn sk2-primary">Edit Qualification</button></div>`);
    modal.dialog.querySelector("#sv-close").addEventListener("click",modal.close);
    modal.dialog.querySelector("#sv-edit").addEventListener("click",()=>{modal.close();edit();});
    modal.dialog.querySelector("#sv-employees").addEventListener("click",()=>openEmployees(data));
    modal.dialog.querySelector("#sv-positions").addEventListener("click",()=>openPositions(data));
  };

  const toast = message => { const n=document.createElement("div");n.style.cssText="position:fixed;right:24px;bottom:24px;z-index:10001;padding:12px 16px;border:1px solid #166534;border-radius:9px;background:#052e16;color:#86efac;font-size:13px;font-weight:700";n.textContent=message;document.body.appendChild(n);setTimeout(()=>n.remove(),2500); };
  const enhance = () => {
    const skills = document.body.textContent.includes("Total Skills") && document.querySelectorAll("table tr").length > 1; document.body.classList.toggle("skills-page-active",skills); if(!skills)return;
    document.querySelectorAll("select").forEach(s=>{if([...s.options].some(o=>o.textContent.trim()==="All Regions")){s.dataset.regionFilter="1";if(s.parentElement?.children.length===1)s.parentElement.style.display="none";}});
    // Hide SCOPE column: find th with text SCOPE, determine its index, inject CSS
    if (!document.getElementById("sk2-scope-hide")) {
      const ths = [...document.querySelectorAll("table th")];
      const scopeTh = ths.find(th => th.textContent.trim().toUpperCase() === "SCOPE");
      if (scopeTh) {
        const idx = [...scopeTh.parentElement.children].indexOf(scopeTh) + 1;
        const s = document.createElement("style");
        s.id = "sk2-scope-hide";
        s.textContent = `table tr th:nth-child(${idx}),table tr td:nth-child(${idx}){display:none!important}`;
        document.head.appendChild(s);
      }
    }
    document.querySelectorAll("table tr").forEach(row=>{const cells=[...row.querySelectorAll("td")];if(cells.length<2)return;const actions=cells.at(-1),buttons=[...actions.querySelectorAll("button")];if(buttons.length<2||actions.dataset.sk2)return;actions.dataset.sk2="1";const nameNode=cells[0].querySelector("button")||cells[0],categoryNode=cells[1];const data=()=>getModel(row,nameNode.textContent.trim(),categoryNode.textContent.trim());const save=d=>{nameNode.textContent=d.name;categoryNode.textContent=d.category;toast("Skill details updated successfully.");};const edit=buttons.at(-2);edit.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openEdit(data(),save);},true);const view=document.createElement("button");view.className=edit.className;view.title="View Qualification";view.setAttribute("aria-label","View Qualification");view.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>';view.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openView(data(),()=>openEdit(data(),save));});const box=actions.querySelector("div")||actions;box.insertBefore(view,box.firstChild);});
  };
  let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;setTimeout(()=>{queued=false;enhance();},120);}).observe(document.body,{childList:true,subtree:true});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",enhance,{once:true}):enhance();
})();
