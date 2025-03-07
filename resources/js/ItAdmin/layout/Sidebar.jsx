import React from "react";

export default function Sidebar() {
    return (
        <>
        
            <aside id="sc-sidebar-main" className="sc-sidebar-info-fixed">
                <div className="uk-offcanvas-bar">
                    <div
                        className="sc-sidebar-main-scrollable"
                        data-sc-scrollbar="visible-y"
                    >
                        <ul className="sc-sidebar-menu uk-nav">
                            <li className="sc-sidebar-menu-heading">
                                <span>Applications</span>
                            </li>

                            <li title="Chat">
                                <a href="pages-chat.html">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-message-outline"></i>
                                    </span>
                                    <span className="uk-nav-title">Chat</span>
                                </a>
                            </li>

                            <li title="Invoices">
                                <a href="pages-invoices.html">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-receipt"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Invoices
                                    </span>
                                </a>
                            </li>

                            <li title="Mailbox">
                                <a href="pages-mailbox.html">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-email-outline"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Mailbox
                                    </span>
                                </a>
                            </li>

                            <li title="Task Board">
                                <a href="pages-task_board.html">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-calendar-text"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Task Board
                                    </span>
                                </a>
                            </li>

                            <li title="Notes">
                                <a href="pages-notes.html">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-note-outline"></i>
                                    </span>
                                    <span className="uk-nav-title">Notes</span>
                                </a>
                            </li>

                            <li className="sc-sidebar-menu-heading">
                                <span>Menu</span>
                            </li>

                            <li title="Dashboards">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-view-dashboard-variant"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Dashboards
                                    </span>
                                </a>

                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="dashboard-v1.html">
                                            {" "}
                                            Dashboard 1{" "}
                                        </a>
                                    </li>

                                    <li className="sc-page-active">
                                        <a href="dashboard-v2.html">
                                            {" "}
                                            Dashboard 2{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li title="Forms">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-format-line-style"></i>
                                    </span>
                                    <span className="uk-nav-title">Forms</span>
                                </a>

                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="forms-regular_elements.html">
                                            {" "}
                                            Regular Elements{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="forms-advanced_elements.html">
                                            {" "}
                                            Advanced Elements{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="forms-dynamic_fields.html">
                                            {" "}
                                            Dynamic Fields{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="forms-validation.html">
                                            {" "}
                                            Validation{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">Form Examples</a>{" "}
                                        <ul>
                                            <li>
                                                <a href="forms_examples-advertising_evaluation_form.html">
                                                    {" "}
                                                    Advertising Evaluation Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-booking_form.html">
                                                    {" "}
                                                    Booking Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-car_rental_form.html">
                                                    {" "}
                                                    Car Rental Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-checkout_form.html">
                                                    {" "}
                                                    Checkout Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-contact_forms.html">
                                                    {" "}
                                                    Contact Forms{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-job_application_form.html">
                                                    {" "}
                                                    Job Application Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-medical_history_form.html">
                                                    {" "}
                                                    Medical History Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-registration_form.html">
                                                    {" "}
                                                    Registration Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-rental_application_form.html">
                                                    {" "}
                                                    Rental Application Form{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_examples-transaction_feedback_form.html">
                                                    {" "}
                                                    Transaction Feedback Form{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#">Wizard</a>{" "}
                                        <ul>
                                            <li>
                                                <a href="forms_wizard-horizontal.html">
                                                    {" "}
                                                    Horizontal{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_wizard-horizontal_minimal.html">
                                                    {" "}
                                                    Horizontal Minimal{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_wizard-vertical.html">
                                                    {" "}
                                                    Vertical{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="forms_wizard-vertical_minimal.html">
                                                    {" "}
                                                    Vertical Minimal{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="sc-sidebar-menu-heading">
                                        <span>WYSIWYG Editors</span>
                                    </li>
                                    <li>
                                        <a href="forms_wysiwyg-ckeditor.html">
                                            {" "}
                                            CKEditor{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms_wysiwyg-tinymce.html">
                                            {" "}
                                            TinyMCE{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li title="Components">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-puzzle"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Components
                                    </span>
                                </a>

                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="components-accordion.html">
                                            {" "}
                                            Accordion{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-alert.html">
                                            {" "}
                                            Alert{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-animations.html">
                                            {" "}
                                            Animations{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-avatars.html">
                                            {" "}
                                            Avatars{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-badge_label.html">
                                            {" "}
                                            Badge, Label{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-base.html">
                                            {" "}
                                            Base{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-breadcrumb.html">
                                            {" "}
                                            Breadcrumb{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-buttons.html">
                                            {" "}
                                            Buttons{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-fab_buttons.html">
                                            {" "}
                                            <span className="uk-label">
                                                new
                                            </span>
                                            FAB Buttons{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-cards.html">
                                            {" "}
                                            Cards{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-color_palette.html">
                                            {" "}
                                            Color Palette{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-drop_dropdowns.html">
                                            {" "}
                                            Drop/Dropdowns{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-filters.html">
                                            {" "}
                                            Filters{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-footer.html">
                                            {" "}
                                            Footer{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-fancy_footer.html">
                                            {" "}
                                            Fancy Footer{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-fancy_toolbar.html">
                                            {" "}
                                            <span className="uk-label">
                                                new
                                            </span>
                                            Fancy Toolbar{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-grid.html">
                                            {" "}
                                            Grid{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-icons.html">
                                            {" "}
                                            Icons{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-lists.html">
                                            {" "}
                                            Lists{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-masonry.html">
                                            {" "}
                                            Masonry{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-modals_dialogs.html">
                                            {" "}
                                            Modals/Dialogs{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-notifications.html">
                                            {" "}
                                            Notifications{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-overlay.html">
                                            {" "}
                                            Overlay{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-pagination.html">
                                            {" "}
                                            Pagination{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-progress_spinners.html">
                                            {" "}
                                            Progress/Spinners{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-scrollable.html">
                                            {" "}
                                            Scrollable{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-slider.html">
                                            {" "}
                                            Slider{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-sortable.html">
                                            {" "}
                                            Sortable{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-swiped_list.html">
                                            {" "}
                                            Swiped List{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-tables.html">
                                            {" "}
                                            Tables{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-tabs.html">
                                            {" "}
                                            Tabs{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-timeline.html">
                                            {" "}
                                            Timeline{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-toolbar.html">
                                            {" "}
                                            Toolbar{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="components-tooltips.html">
                                            {" "}
                                            Tooltips{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li title="Pages">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-application"></i>
                                    </span>
                                    <span className="uk-nav-title">Pages</span>
                                </a>

                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="pages-blank.html"> Blank </a>
                                    </li>

                                    <li>
                                        <a href="pages-blank_header_expanded.html">
                                            {" "}
                                            Blank (expanded header){" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-contact_list.html">
                                            {" "}
                                            Contact List{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-contact_list_single.html">
                                            {" "}
                                            Contact List (single){" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-data_visualization.html">
                                            {" "}
                                            Data visualization{" "}
                                        </a>
                                    </li>

                                    <li className="sc-sidebar-menu-heading">
                                        <span>Error Pages</span>
                                    </li>
                                    <li>
                                        <a href="error_404.html"> Error 404 </a>
                                    </li>
                                    <li>
                                        <a href="error_500.html"> Error 500 </a>
                                    </li>

                                    <li className="sc-sidebar-menu-separator"></li>

                                    <li>
                                        <a href="pages-gallery.html">
                                            {" "}
                                            Gallery{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-help_faq.html">
                                            {" "}
                                            Help/Faq{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-invoice_create.html">
                                            {" "}
                                            Invoice (new){" "}
                                        </a>
                                    </li>

                                    <li className="sc-sidebar-menu-heading">
                                        <span>Issue Tracker</span>
                                    </li>
                                    <li>
                                        <a href="pages-issues_list.html">
                                            {" "}
                                            List View{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pages-issue_details.html">
                                            {" "}
                                            Issue Details{" "}
                                        </a>
                                    </li>

                                    <li className="sc-sidebar-menu-separator"></li>

                                    <li>
                                        <a href="login_page.html">
                                            {" "}
                                            Login Page{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-poi_listing.html">
                                            {" "}
                                            POI listing{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-pricing_tables.html">
                                            {" "}
                                            Pricing Tables{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-settings.html">
                                            {" "}
                                            Settings{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="pages-user_profile.html">
                                            {" "}
                                            User Profile{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li title="Plugins">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-power-plug"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Plugins
                                    </span>
                                </a>

                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="plugins-ajax.html"> Ajax </a>
                                    </li>

                                    <li>
                                        <a href="plugins-calendar.html">
                                            {" "}
                                            Calendar{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-calendar_events.html">
                                            {" "}
                                            Calendar/Events{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-charts.html">
                                            {" "}
                                            Charts{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-code_editor.html">
                                            {" "}
                                            Code Editor{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-data_grid.html">
                                            {" "}
                                            Data Grid{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-datatables.html">
                                            {" "}
                                            Datatables{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-diff_tool.html">
                                            {" "}
                                            Diff Tool{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-gantt_chart.html">
                                            {" "}
                                            Gantt Chart{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-google_maps.html">
                                            {" "}
                                            Google Maps{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-idle_timeout.html">
                                            {" "}
                                            Idle Timeout{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-image_cropper.html">
                                            {" "}
                                            Image Cropper{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-push_notifications.html">
                                            {" "}
                                            Push Notifications{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="plugins-tour.html"> Tour </a>
                                    </li>

                                    <li>
                                        <a href="plugins-tree.html"> Tree </a>
                                    </li>

                                    <li>
                                        <a href="plugins-vector_maps.html">
                                            {" "}
                                            Vector Maps{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li title="Layout">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-view-compact-outline"></i>
                                    </span>
                                    <span className="uk-nav-title">Layout</span>
                                </a>

                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="layout-boxed.html">
                                            {" "}
                                            <span className="uk-label">
                                                new
                                            </span>
                                            Boxed{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="layout-top_menu.html">
                                            {" "}
                                            Top Menu{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="layout-mini_sidebar.html">
                                            {" "}
                                            Mini Sidebar{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a href="layout-offcanvas_sidebar.html">
                                            {" "}
                                            Offcanvas Sidebar{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li title="Multi-level">
                                <a href="#">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-format-line-weight"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Multi level
                                    </span>
                                </a>
                                <ul className="sc-sidebar-menu-sub">
                                    <li>
                                        <a href="#">Submenu 1</a>
                                    </li>
                                    <li className="sc-js-submenu-trigger sc-has-submenu">
                                        <a href="#">Submenu 2</a>
                                        <ul>
                                            <li>
                                                <a href="#">Submenu 2.1</a>
                                            </li>
                                            <li>
                                                <a href="#">Submenu 2.2</a>
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            Submenu 2.2.1
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Submenu 2.2.2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Submenu 2.2.3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">Submenu 2.3</a>
                                            </li>
                                            <li>
                                                <a href="#">Submenu 2.4</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Submenu 3</a>
                                    </li>
                                    <li>
                                        <a href="#">Submenu 4</a>
                                        <ul>
                                            <li>
                                                <a href="#">Submenu 4.1</a>
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            Submenu 4.1.1
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Submenu 4.1.2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Submenu 4.1.3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">Submenu 4.2</a>
                                            </li>
                                            <li>
                                                <a href="#">Submenu 4.3</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="sc-sidebar-info">version: 2.6.0</div>
                </div>
            </aside>
        </>
    );
}
