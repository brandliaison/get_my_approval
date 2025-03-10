<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    // 🟢 GET ALL TICKETS
    public function index()
    {
        return response()->json(Ticket::with(['category', 'creator'])->get());
    }

    // 🟢 CREATE TICKET
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'details' => 'required|string',
            'ticket_category_id' => 'required|exists:tickets_categories,_id',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['status'] = 'open';
        $validated['from_platform'] = 'operations';

        $ticket = Ticket::create($validated);

        return response()->json(['message' => 'Ticket created successfully', 'ticket' => $ticket], 201);
    }

    // 🟢 GET SINGLE TICKET
    public function show($id)
    {
        $ticket = Ticket::with(['category', 'creator'])->find($id);
        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }
        return response()->json($ticket);
    }

    // 🟢 UPDATE TICKET
    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $validated = $request->validate([
            'subject' => 'sometimes|string|max:255',
            'details' => 'sometimes|string',
            'ticket_category_id' => 'sometimes|exists:tickets_categories,_id',
            'status' => 'sometimes|in:open,in_progress,closed',
            'rating' => 'sometimes|integer|min:1|max:5',
            'feedback' => 'sometimes|string|nullable',
        ]);

        if ($request->has('rating')) {
            $validated['rated_at'] = Carbon::now();
        }
        $validated['from_platform'] = 'operations';

        $ticket->update($validated);

        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    // 🟢 DELETE TICKET
    public function destroy($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}
